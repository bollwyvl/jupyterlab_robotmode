"""A JupyterLab extension which adds a CodeMirror mode for Robot Framework syntax"""
# Copyright (c) 2023 MarketSquare

from ._version import __ext__, __prefix__, __version__

__all__ = [
    "__version__",
    "_jupyter_labextension_paths",
]


def _jupyter_labextension_paths():
    """The labextension entry point."""
    return [{"src": str(__prefix__), "dest": __ext__}]
