from enum import Enum

class OrderStatus(str, Enum):
    IN_QUEUE = "inQueue"
    IN_PROGRESS = "inProgress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
