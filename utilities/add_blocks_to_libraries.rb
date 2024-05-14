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
    spec = cleanup_spec_for_search(spec.strip)
    category = block['category']

    # translations is a text file of langauge_code:block_spec pairs
    translations = parse_translations(block.xpath('translations'))

    blocks << { spec: spec, category: category, translations: translations }
  end

  return blocks
end

# Parse translations from a block-definition
# translations is a text block of langauge_code:block_spec pairs
def parse_translations(translations)
  return {} if translations.nil? || translations.text.empty?

  pairs = translations.text.split('\n').map do |translation|
    lang, spec = translation.split(':')
    spec = cleanup_spec_for_search(spec.strip)
    [lang, spec]
  end

  return Hash[pairs]
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
  libraries = JSON.parse(File.read(FILE))

  # Iterate through each library object
  libraries.each do |library|
    fileName = library['fileName']
    # skip "spacer" library objects
    next if fileName == '~'

    blocks = parse_blocks(fileName)

    categories = blocks.map { |block| block[:category] }.uniq
    specs = blocks.map { |block| block[:spec] }
    # translations are a hash of lang_code:spec pairs for each block
    translations = blocks.map { |block| block[:translations] }

    # collect all the translations into a single hash by lang_code to searchData: [specs list]
    translations = translations.reduce({}) do |acc, translation|
      translation.each do |lang, spec|
        acc[lang] ||= { searchData: [] }
        acc[lang][:searchData] << spec
      end
      acc
    end

    if replaceexisting
      library['searchData'] = specs
      library['categories'] = categories
      if library['translations'].nil?
        library['translations'] = translations
      else
        library['translations'].each do |lang, data|
          if !translations[lang].nil?
            data[:searchData] = translations[lang][:searchData]
          end
        end
      end

    else
      library['searchData'] ||= []
      library['categories'] ||= []
      library['searchData'] = (library['searchData'] + specs).uniq
      library['categories'] = (library['categories'] + categories).uniq
      library['translations'] ||= {}
      # merge search data for each language
      translations.each do |lang, data|
        library['translations'][lang] ||= { searchData: [] }
        library['translations'][lang][:searchData] = (library['translations'][lang][:searchData] + data[:searchData]).uniq
      end
    end
  end

  File.open(FILE, 'w') do |f|
    f.write(JSON.pretty_generate(libraries))
  end
end

puts "Adding blocks to LIBRARIES.json..."
add_blocks_to_libraries(true)
puts "Done!"
