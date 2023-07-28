"""Source of truth for jupyterlab_robotmode version information."""
# Copyright (c) 2023 MarketSquare

import sys
from pathlib import Path
from importlib.metadata import version

__all__ = ["__version__", "__ext__", "__prefix__"]
NAME = "jupyterlab_robotmode"
__ext__ = f"@marketsquare/{NAME}"

HERE = Path(__file__).parent

SHARE_EXT = f"share/jupyter/labextensions/{__ext__}"

IN_TREE = (HERE / "_prefix" / SHARE_EXT).resolve()
IN_PREFIX = Path(sys.prefix) / SHARE_EXT

__prefix__ = IN_TREE if IN_TREE.exists() else IN_PREFIX

__version__ = version(NAME)
