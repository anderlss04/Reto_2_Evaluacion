# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Ibex35'
copyright = '2023, Ander'
author = 'Ander'
release = 'https://github.com/anderlss04/Reto_2_Evaluacion/'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.todo',
    'sphinx.ext.viewcode',
    'sphinx.ext.githubpages',
    'sphinx.ext.autosummary',
    'sphinx.ext.intersphinx',
    'sphinx.ext.mathjax',
]

templates_path = ['_templates',
                  'sphinxext',
                  'sphinxext/templates']

exclude_patterns = []

language = 'es'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'alabaster'
html_static_path = ['_static']

# -- Options for HTMLHelp output ---------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-htmlhelp-output

htmlhelp_basename = 'Ibex35doc'

# -- Options for LaTeX output ------------------------------------------------

latex_elements = {
    'papersize': 'a4paper',
    'pointsize': '10pt',
    'preamble': '',
    'figure_align': 'htbp',
}

latex_documents = [
    (master_doc, 'Ibex35.tex', 'Ibex35 Documentation',
        'Ander', 'manual'),
]

# -- Options for manual page output ------------------------------------------


# -- Options for Texinfo output ----------------------------------------------

