# author: meisto
# date: 2025-02-03 20:57:09
"""Logging functionality."""

import logging as _logging


def _setup_logger():
    """Set up a modified logger."""

    local_logger = _logging.getLogger("Logger")

    logging_stream_handler = _logging.StreamHandler()
    logging_stream_handler.setFormatter(_CustomFormatter())

    local_logger.addHandler(logging_stream_handler)

    return local_logger


class _CustomFormatter(_logging.Formatter):

    green_background = "\x1b[42;1;30m"
    grey = "\x1b[38;20m"
    yellow = "\x1b[33;20m"
    red = "\x1b[31;20m"
    bold_red = "\x1b[38;1"
    reset = "\x1b[0m"
    format_str = (
        "%(asctime)s |"
        + green_background
        + " %(levelname)-4s "
        + reset
        + "| %(module)s:%(funcName)s:%(lineno)d - %(message)s"
    )

    FORMATS = {
        _logging.DEBUG: grey + format_str + reset,
        _logging.INFO: format_str,
        _logging.WARNING: yellow + format_str + reset,
        _logging.ERROR: red + format_str + reset,
        _logging.CRITICAL: bold_red + format_str + reset,
    }

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = _logging.Formatter(log_fmt)
        return formatter.format(record)


logger = _setup_logger()
