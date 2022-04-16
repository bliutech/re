
from xml.dom import NOT_FOUND_ERR

# Source: CalRecycle
trash_dict = {
    "landfill": ["clothes", "shoes", "trash"],
    "recycle": ["brown-glass", "green-glass", "white-glass", "plastic", "paper"],
    "compost": ["biological", "cardboard"],
    "special": ["battery", "metal"]
}

def imageSearch():
    # Take in an image (from parameter that's currently unset)

    # Collect the output from the model
    output_str = "biological"
    # Pair output type with disposal method
    for key, value in trash_dict:
        if output_str in value:
            return (output_str, key)
    raise NOT_FOUND_ERR
