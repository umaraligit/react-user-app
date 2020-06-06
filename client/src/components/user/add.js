import React, { Fragment, useState } from 'react';
import _ from 'underscore';
import Axios from '../../utils/ApiAxios';

import './index.scss';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  // const [isValid, setValid] = useState(Boolean);

  const onChange = e => {
      if(e.target.files) {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setMessage('');
      } else
      if(e.target.name.toString() === 'name' && e.target.value.match(/^[A-Za-z]+$/)) {
        setName(e.target.value);
        setMessage('');
      } else
      if(e.target.name.toString() === 'mobile') {
        const params = {};
        params.mobile = e.target.value;
        Axios.post('/user/getUserByMobile', params)
        .then((res) => {
          if(res.status === 200) {
            const isExist = res.data.response[0].isExist;
            if(isExist === 0) {
              setMobile(params.mobile);
              setMessage('');
            }else {
              setMessage('Mobile Number already registered');
            }
          }
        })
      } else {
        setMessage(e.target.name+' field is invalid');
      }
  };

  const openFile = () => {
    document.getElementById('upload').click();
  }

  const reset = () => {
    document.getElementById('form').reset();
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('mobile', mobile);
    Axios.post('/user/add', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((res) => {
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage('Data Inserted!');
      setFilename('Choose File');
      reset();
    })
    .catch(err => console.log('Error--->', err));
  };

  return (
    <Fragment>
        <div className='addUser'>
            <form id='form' onSubmit={onSubmit}>
              {(message) &&
                <div className='alert alert-info fade show' role='alert'>
                  {message}
                </div>
              }
                <input type='text' name='name' placeholder='Name' onBlur={onChange} required/>
                <input type='text' name='mobile' placeholder='Mobile' onBlur={onChange} required/>
                {(filename) && <span className='text-success'>Selected Picture: {filename}</span>}
                <input
                    type='file'
                    id='upload'
                    onChange={onChange}
                    required
                />
                <input
                type='button'
                value='Upload Picture'
                className='btn btn-primary btn-block mt-4'
                id='uploadButton'
                onClick={openFile}
                />

                <input
                type='submit'
                value='Upload'
                className='btn btn-primary btn-block mt-4'
                id='uploadButton'
                disabled={!(_.isEmpty(message))}
                />
            </form>
            {uploadedFile ? (
                <div className='row mt-5'>
                <div className='col-md-6 m-auto'>
                    <h3 className='text-center'>{uploadedFile.fileName}</h3>
                    <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                </div>
                </div>
            ) : null}
      </div>
    </Fragment>
  );
};

export default FileUpload;
