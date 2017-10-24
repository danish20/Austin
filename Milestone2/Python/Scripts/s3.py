import tinys3

conn = tinys3.Connection('AKIAIHCDSNE43LJH65VA','xEvn6MkKojhZ+znB4YF01D4d2LzkPByUO5i4u+7M',tls=True)

f = open('../Plots/plot_image.png','rb')
conn.upload('plot_image1.png',f,'austinbot')