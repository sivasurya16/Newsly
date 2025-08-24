import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';
import { v4 as uuidv4 } from 'uuid';


const dbx = new Dropbox({
  clientId: process.env.DROPBOX_APP_KEY,
  clientSecret: process.env.DROPBOX_APP_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
  fetch
});

const saveFile = async (fileName, contents) => {
    const unique_filename = `/${uuidv4()}-${fileName}`;
    try {
        await dbx.filesUpload({ path: unique_filename, contents });
        const res = await dbx.sharingCreateSharedLinkWithSettings({ path: unique_filename });
        const link = res.result.url + '&raw=1';
        return link;
    } catch (err) {
        console.error(err);
    }
}

// const listFiles = () => {
//     dbx.filesListFolder({ path: '' })
//         .then((res) => console.log(res.result.entries))
//         .catch((err) => console.error(err))
// }
// const getFile = (fileName) => {
//     try{
//         const res = dbx.sharingCreateSharedLinkWithSettings({ path: fileName });

//     }
//     // .then(res => {
//         //     console.log('Sharable link:', res.result.url);
//         // })
//         // .catch(err => {
//         //     // Dropbox returns an error if the link already exists
//         //     if (err.error?.error_summary?.startsWith('shared_link_already_exists')) {
//         //         dbx.sharingListSharedLinks({ path: fileName })
//         //             .then(linkRes => {
//         //                 console.log('Existing sharable link:', linkRes.result.links[0]?.url);
//         //             });
//         //     } else {
//         //         console.error('Error creating sharable link:', err);
//         //     }
//         // });

// }

export default saveFile;