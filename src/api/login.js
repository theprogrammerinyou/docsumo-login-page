import axios from 'axios';

export function login(userDetails) {
    return new Promise((resolve, reject) => {
        axios.post(
          "https://apptesting.docsumo.com/api/v1/eevee/login",
          userDetails
        ).then((response) => {
            if (response?.data?.data) {
                resolve(response.data.data)
            }
        }).catch(error => {
            reject(new Error(error));
        })
    })
}