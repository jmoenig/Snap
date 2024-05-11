#! /usr/bin/env ruby

require 'json'
require 'fileutils'
require 'nokogiri'
require 'cgi'

# This script is used to add blocks to the libraries.json file.
# It parses blocks from the fileName of each library object then adds
# the blocks to the searchData array of the library object.

FILE = 'libraries/LIBRARIES.json'

def parse_blocks(fileName)
  puts "Parsing blocks from #{fileName}..."
  path = "libraries/#{fileName}"
  blocks = []
  doc = Nokogiri::XML(File.read(path))

  # binding.irb
  # extract the spec and category from each block-definition
  doc.xpath('//block-definition').each do |block|
    # skip helper blocks so they don't show up in the search
    next if block['helper'] == 'true'
    spec = block['s']
    next if spec.nil?

    # unescape html entities in the spec
    # replace Snap! inputs with _, e.g %'a' -> _
    spec = cleanup_spec_for_search(spec)
    category = block['category']

    # TODO: handle translations for block specs
    blocks << { spec: spec, category: category }
  end

  return blocks
end

# Text descriptions of symbols for easier search
SYMBOLS = {
  '$arrowRight': 'to',
  '$arrowLeft': 'from',
  '$nl': '', # newline
  '$flash': 'flash turbo fast',
  '$turnRight': 'turn right rotate',
  '$turnLeft': 'turn left rotate',
}

def cleanup_spec_for_search(spec)
  # unescape html entities in the spec
  spec = CGI.unescapeHTML(spec)

  # replace Snap! inputs with _, e.g %'a' -> _
  spec = spec.gsub(/%'.*?'/, '_')

  # Remove color information from the spec, e.g. $text-1-2-3-4 -> $text
  spec = spec.gsub(/\$.*?(?=-\d)/, '$')

  # Replace symbols with text descriptions
  SYMBOLS.each do |symbol, text|
    spec = spec.gsub(symbol.to_s, text)
  end

  return spec
end

def add_blocks_to_libraries(replaceexisting = false)
  # Read the libraries.json file
  file = File.read(FILE)
  data_hash = JSON.parse(file)

  # Iterate through each library object
  data_hash.each do |library|
    fileName = library['fileName']
    # skip "spacer" library objects
    next if fileName == '~'

    blocks = parse_blocks(fileName)
    categories = blocks.map { |block| block[:category] }.uniq
    specs = blocks.map { |block| block[:spec] }
    if replaceexisting
      library['searchData'] = specs
      library['categories'] = categories
    else
      library['searchData'] ||= []
      library['categories'] ||= []
      library['searchData'] = (library['searchData'] + specs).uniq
      library['categories'] = (library['categories'] + categories).uniq
    end
  end

  # Write the updated libraries.json file
  File.open(FILE, 'w') do |f|
    f.write(JSON.pretty_generate(data_hash))
  end
end

puts "Adding blocks to LIBRARIES.json..."
add_blocks_to_libraries(true)
puts "Done!"
