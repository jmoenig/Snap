#! /usr/bin/env ruby

# To be run from the root of the Snap! repository.
# Usage: ruby convert_media_files.rb path/to/media/FILE

# Snap! "media" files are a tab-delimited file with the following columns:
# 1. File name
# 2. Name (for users)
# 3. Description (optional)

# Output format is a new JSON file with the following fields:
# 1. File name
# 2. Name
# 3. Description
# 4. categoires (optional, list)
# 5. Search Data (optional, list of keywords)
# 6. Translations (optional, map of language to name/description/category/search text)

require 'fileutils'
require 'json'

def cleanup_translations_dict_to_json(data)
  data = data.gsub(/\s*SnapTranslator\.dict\.\w+\s*=\s*/, '').gsub(/'/, '\'').gsub(/;/, '')
  begin
    JSON.parse(data)
  rescue JSON::ParserError => e
    puts "Error parsing JSON"
    {}
  end
end

def load_translations
  translations = {}
  Dir.glob('locale/lang-*.js').each do |file|
    lang = File.basename(file, '.js').sub('lang-', '')
    puts "Reading #{lang} -- #{file}"
    translations[lang] = cleanup_translations_dict_to_json(File.read(file))
  end

  puts "Read #{translations.length} translations"
  translations
end

def convert_media_file(file)
  data = []
  File.open(file, 'r') do |f|
    f.each_line do |line|
      parts = line.split("\t")
      next if parts.length < 2
      name = parts[1].strip
      description = parts[2].strip if parts.length > 2
      item = {
        fileName: parts[0].strip,
        name: name,
        # categoires: [], Don't add these yet
        # searchData: [],
        # translations: {}
      }
      item[:description] = description if description
      data << item
    end
  end
  data
end


def add_transations_to_media_data(data, translations)
  data.each do |item|
    translations.each do |lang, translation|
      name = translation[item[:name]] || ''
      description = translation[item[:description]] || ''
      if name.length > 0 || description.length > 0
        item[:translations] = {} unless item[:translations]
        item[:translations][lang] = {}
        item[:translations][lang][:name] = name if name.length > 0
        item[:translations][lang][:description] = description if description.length > 0
        # item[:translations][lang][:categories] = []
        # item[:translations][lang][:searchData] = []
      end
    end
  end
end


def do_conversion(file)
  puts "Converting #{file}"
  output_path = "#{FILE}.json"
  data = convert_media_file(FILE)

  add_transations_to_media_data(data, load_translations)

  File.open(output_path, 'w') do |f|
    f.puts JSON.pretty_generate(data)
  end
  puts "Wrote #{output_path}"
end

FILE = ARGV[0]
do_conversion(FILE)
