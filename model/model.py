import torch
from torch import utils, nn, optim
from torchvision import transforms, models
import cv2
import numpy as np


class Dataset(utils.data.Dataset):
    def __init__(self, data):
        self.inputs, self.labels = data  # expects tuple of numpy arrays

    def classes(self):
        return self.labels

    def __len__(self):
        return self.labels.shape[0]
    
    def get_batch_inputs(self, idx):
        # fetch a batch of inputs
        return self.inputs[idx]
    
    def get_batch_labels(self, idx):
        # fetch a batch of labels
        return self.labels[idx]

    def __getitem__(self, idx):
        batch_inputs = self.get_batch_inputs(idx)
        batch_labels = self.get_batch_labels(idx)

        return batch_inputs, batch_labels


class Model(nn.Module):
    
    def __init__(self, input_dim, output_dim):
        super(Model, self).__init__()
        # initialize layers
        self.resnet = models.resnet50(pretrained=False)
        self.resnet.fc = nn.Linear(2048, 1024)
        self.dense = nn.Linear(1024, 128)
        self.out = nn.Linear(128, output_dim)
    
    def forward(self, inputs):
        # print(inputs.shape)
        inputs = torch.movedim(inputs, -1, 1)
        # forward propagation
        inputs = self.resnet(inputs)
        inputs = self.dense(inputs)
        return self.out(inputs)


def square_crop(image_array):
    """
    crops image to largest square (centered)
    image_array (numpy array): raw numpy image, [width, height, 3]
    """
    is_portrait = image_array.shape[0] >= image_array.shape[1]
    large_side = image_array.shape[0] if is_portrait else image_array.shape[1]
    small_side = image_array.shape[1] if is_portrait else image_array.shape[0]
    crop_low = round(large_side / 2) - round(small_side / 2)
    crop_high = round(large_side / 2) + (small_side - round(small_side / 2))
    return image_array[crop_low:crop_high] if is_portrait\
           else image_array[:, crop_low:crop_high]


def pre_process(input_, resize=64):
    """
    converts raw numpy image array to square resized image array
    input_ (numpy array): raw numpy image, [width, height, 3]
    """
    input_ = square_crop(input_) / 255
    input_ = cv2.resize(
        input_, dsize=[resize, resize], interpolation=cv2.INTER_CUBIC
    )
    return input_


def model(input_, model_path, process=True):

    if process:
        input_ = pre_process(input_)
    
    data_np = (np.expand_dims(input_, axis=0), np.asarray([0]))
    data = Dataset(data_np)
    loader = utils.data.DataLoader(data, batch_size=1)

    model_load = Model(3 * 64 * 64, 12)
    # change the path inside torch.load depending on the model
    model_load.load_state_dict(torch.load(model_path))
    model_load.eval()

    for batch_inputs, batch_labels in iter(loader):
        batch_inputs = batch_inputs.type(torch.FloatTensor)
        batch_labels = batch_labels.type(torch.int64)
        
        batch_outputs = model_load(batch_inputs)
        return batch_outputs[0].detach().numpy()