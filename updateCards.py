#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import shutil
import urllib.request
import os
import zipfile


def main():
    download('https://ygocdb.com/api/v0/cards.zip', 'public/cards.zip')
    download('https://ygocdb.com/api/v0/cards.zip.md5', 'public/cards.zip.md5')
    unzip('public/cards.zip', 'public/', 'cards.json')
    deleteFile('public/cards.zip')
    deleteFolder('public/id')
    deleteFolder('public/cid')
    createFolder('public/id')
    createFolder('public/cid')
    with open('public/cards.json', encoding="utf-8") as f:
        data = json.load(f)
    ids = set()
    cids = set()
    for key in data:
        id = str(data[key]['id'])
        ids.add(id)
        id_path = 'public/id/' + id + '.json'
        with open(id_path, 'w', encoding="utf-8") as f:
            json.dump(data[key], f, ensure_ascii=False)
        cid = str(data[key]['cid'])
        cids.add(cid)
        cid_path = 'public/cid/' + cid + '.json'
        with open(cid_path, 'w', encoding="utf-8") as f:
            json.dump(data[key], f, ensure_ascii=False)
    deleteFile('public/id/0.json')
    deleteFile('public/cid/0.json')
    if '0' in ids:
        ids.remove('0')
    if '0' in cids:
        cids.remove('0')
    with open('public/id/all.json', 'w', encoding="utf-8") as f:
        json.dump(list(ids), f, ensure_ascii=False)
    with open('public/cid/all.json', 'w', encoding="utf-8") as f:
        json.dump(list(cids), f, ensure_ascii=False)


def download(url, save_path):
    deleteFile(save_path)
    urllib.request.urlretrieve(url, save_path)


def deleteFile(file_path):
    try:
        os.remove(file_path)
    except OSError:
        pass


def deleteFolder(folder_path):
    try:
        shutil.rmtree(folder_path)
    except OSError:
        pass


def createFolder(folder_path):
    try:
        os.mkdir(folder_path)
    except OSError:
        pass


def unzip(file_path, save_path, file_name):
    deleteFile(save_path+file_name)
    with zipfile.ZipFile(file_path, 'r') as zip_ref:
        zip_ref.extract(file_name, save_path)


if __name__ == '__main__':
    main()
