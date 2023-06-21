import axios from 'axios';
export const API_BASE = "https://aegisvault-create.azurewebsites.net/api/";

// export function CreateLinkRequestV1(URL: string, Password: string): boolean {
//     // Make a request for a user with a given ID
//     axios.post(API_BASE + 'v1/CreateLink', {
//         URL: URL,
//         Password: Password
//     })
//         .then(function (response) {
//             // handle success
//             console.log(response);
//             return true;
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//             return false;
//         });
//     // Should never hit this return statement

//     return true;
//     //   .finally(function () {
//     //     // always executed
//     //   });
// }
