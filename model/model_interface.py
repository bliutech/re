from xml.dom import NOT_FOUND_ERR
import cv2
import numpy as np
from model import model


# Source: CalRecycle
label_to_trash = {
    0: "battery",
    1: "biological",
    2: "brown-glass",
    3: "cardboard",
    4: "clothes",
    5: "green-glass",
    6: "metal",
    7: "paper",
    8: "plastic",
    9: "shoes",
    10: "trash",
    11: "white-glass",
}

trash_to_type = {
    "landfill": ["clothes", "shoes", "trash"],
    "recycle": ["brown-glass", "green-glass", "white-glass", "plastic", "paper"],
    "compost": ["biological", "cardboard"],
    "special": ["battery", "metal"],
}


def trash_type(output):
    for key, value in trash_to_type.items():
        if output in value:
            return key
    raise NOT_FOUND_ERR


def normalize(confidence):
    # tanh function
    return 0.5 * (np.tanh(2 * confidence - 1) + 1)


def normalize_output(output, top=3, display=True):
    output_label = dict(zip(range(12), list(output)))
    output_sort = sorted(output_label.items(), key=lambda x:x[1], reverse=True)

    trash_labels = [label_to_trash[output[0]] for output in output_sort[:top]]
    trash_output = [output[1] for output in output_sort[:top]]
    trash_confidence = list(
        normalize(np.asarray(trash_output) / max(trash_output))
    )
    if display:
        for i, output in enumerate(trash_labels):
            print(f"{output}: {round(trash_confidence[i] * 100, 2)}%")
    
    return dict(zip(trash_labels, trash_confidence))


def image_search():
    # use test image (need to be replaced)
    image_array = cv2.imread("tests/clothes_1.jpg")
    # get model raw output
    output = model(image_array, "models/model_0416_1135", process=True)
    # get output precentage (normalize to top n)
    output_trash = normalize_output(output, top=3, display=True)
    # get trash type
    for trash, confidence in output_trash.items():
        output_trash[trash] = (trash_type(trash), confidence)
    return output_trash


def main():
    image_search()


if __name__=="__main__":
    main()