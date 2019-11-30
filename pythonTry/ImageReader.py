from Pillow import Image

def ReadImage(imageName):
  image = Image.open(imageName, "r")
  pix_val = list(image.getdata())
  pix_val_flat = [x for sets in pix_val for x in sets]
  print(pix_val)
  print("FLATTEN")
  print(pix_val_flat)

ReadImage("mountains.png")

