// async function imageDownload() {
//     const mapInfo = {
//       _id: mapID,
//       tileGrid: tileGrid,
//       assetGrid: assetGrid,
//       tiles: tiles,
//       assets: assets,
//       characters: characters
//     };
//     let fileSaver = require("file-saver");
//     let file = await downloadMap(mapInfo);
//     fileSaver.saveAs(file);
//     if (author === username) handleMapSave();
// }

// export async function handleAvatar() {
//     const legalTypes = ["image/png", "image/jpeg"];
//     if (!legalTypes.includes(avatarFile.type)) {  // check that file is image
//       window.alert("The avatar must be a JP(E)G or PNG file.");
//       return false;
//     }
//     if (avatarFile.size > 75000) {  // limit avatar sizes to 75KB (a weird cap)
//       window.alert("Please choose an image under 75KB.");
//       return false;
//     }
//     const reader = new FileReader();  // HTML5 feature, reads file input
//     reader.onload = (e) => {  // define reader behavior when read as text
//       const newAvatar = {
//         _id: username,
//         body: e.target.result
//       };
//       if (avatar) {
//         // console.log("Updating avatar...");
//         updateObject(newAvatar, "avatars");
//       }
//       else { 
//         // console.log("Creating new avatar...");
//         createObject(newAvatar, "avatars");
//       }
//     };

//     reader.readAsDataURL(avatarFile)
//     return true;
//   }