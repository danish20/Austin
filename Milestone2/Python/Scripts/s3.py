import tinys3
import os

def save_file_to_s3(file_name):
    current_path = os.path.dirname(os.path.realpath("__file__"))
    conn = tinys3.Connection('AKIAIHCDSNE43LJH65VA','xEvn6MkKojhZ+znB4YF01D4d2LzkPByUO5i4u+7M',tls=True)
    f = open(os.path.join(current_path,'../Plots/' + file_name),'rb')
    conn.upload(file_name, f, 'austinbot')
             
