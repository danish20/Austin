import tinys3
import os
import boto
import boto.s3.connection
from boto.s3.key import Key

def save_file_to_s3_tinys3(file_name):
    current_path = os.path.dirname(os.path.realpath("__file__"))
    conn = tinys3.Connection('AKIAI6KJYT4ZD4QRHDRA','8Qu21SHYC+dy//n23smDHXqMDkA5oafV9xuoOGhn',tls=True)
    f = open(os.path.join(current_path,'../Plots/' + file_name),'rb')
    conn.upload(file_name, f, 'austinbot')
             
def save_file_to_s3(file_name):

    conn = boto.s3.connect_to_region('us-east-2',
    aws_access_key_id = 'AKIAI6KJYT4ZD4QRHDRA',
    aws_secret_access_key = '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',
    # host = 's3-website-us-east-1.amazonaws.com',
    # is_secure=True,               # uncomment if you are not using ssl
    calling_format = boto.s3.connection.OrdinaryCallingFormat())

    bucket = conn.get_bucket('austinbot')
    key_name = file_name
    path = '' #Directory Under which file should get upload
    current_path = os.path.dirname(os.path.realpath("__file__"))
    full_key_name = os.path.join(path, key_name)
    k = bucket.new_key(full_key_name)
    k.set_contents_from_filename(os.path.join(current_path, '../Milestone2/Python/Plots/' + key_name))
