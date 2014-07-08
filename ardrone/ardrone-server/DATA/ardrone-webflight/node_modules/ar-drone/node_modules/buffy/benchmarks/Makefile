results/ascii-strings-binary.csv: binary.js fixtures/ascii-strings.bin
	node $^ | tee $@

results/ascii-strings-buffy.csv: buffy.js fixtures/ascii-strings.bin
	node $^ | tee $@

fixtures/ascii-strings.bin: fixtures/generate-strings.js
	node $^ $@
