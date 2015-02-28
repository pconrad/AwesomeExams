# Makefile for Sample SIGCSE (double-blind-style) paper

# This target lists all the other targets we want to be triggered by default
# when we type "make" or "make all"

all: proofs

# This target runs the latex commands to create the blind.pdf 
# file, the version of the paper for double-blind reviewing.

proofs:  proofs.tex
	- /bin/rm -f *.dvi *.aux
	latex proofs.tex
	dvips proofs.dvi -t letter -P pdf -G0
	ps2pdf proofs.ps

clean:
	- /bin/rm -f *.dvi *.aux *.ps *.blg *.bbl *.log *.bak *.pdf

