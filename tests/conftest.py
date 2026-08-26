import logging

log = logging.getLogger(__name__)

# Example how to supress certain modules logging
#logging.getLogger("urllib3.connectionpool").disabled = True