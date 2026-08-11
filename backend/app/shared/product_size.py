from enum import Enum

class ProductSize(str, Enum):
  CAN_330 = 'Can 330ml',
  CAN_440 = 'Can 440ml',
  PINT_THIRD = 'Pint 1/3rd',
  PINT_HALF = 'Pint 1/2',
  PINT = 'Pint',
