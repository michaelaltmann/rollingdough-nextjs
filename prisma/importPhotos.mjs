// @ts-nocheck
import { promises as fs } from 'fs';
import { join } from 'path';
import ExifReader from 'exifreader';
/**
 * @param {string} directoryPath
 */
async function readFilesInDirectory(directoryPath) {
  const files = await fs.readdir(directoryPath)
  const imageFiles = files.filter(s => s.toLowerCase().endsWith('.heic') || s.toLowerCase().endsWith('.jpg'))
  const allData = await Promise.all(imageFiles.map(async (file) => {
    console.log(file)
    try {
      const filePath = join(directoryPath, file);
      // @ts-ignore
      const { latitude, longitude } = await getGeolocationFromPhoto(filePath)
      const data = {
        file: file,
        lat: latitude,
        lon: longitude
      }

      return data
    } catch (e) {
      console.log(e)
      return {}
    }
  }))
  return allData
}


/**
 * @param {string} photoPath
 */
async function getGeolocationFromPhoto(photoPath) {
  const tags = await ExifReader.load(photoPath, { expanded: true });

  if (tags.gps) {
    const latitude = tags.gps.Latitude
    const longitude = tags.gps.Longitude

    return { latitude, longitude };
  } else {
    return null; // No geolocation data found
  }
}

async function importPhotos() {
  const directoryPath = "./public/images/art"
  const data = await readFilesInDirectory(directoryPath)
  const places = data.map(x => {
    const file = x.file
    const title = file.substring(0, file.indexOf('.'))
    return {
      id: title,
      name: file,
      title: title,
      address: "",
      description: "",
      category: "ART",
      lat: x.lat,
      lon: x.lon
    }
  })
  const images = data.map(x => {
    const file = x.file
    const title = file.substring(0, file.indexOf('.'))
    return {
      placeId: title,
      url: "/images/art/" + file,
    }
  })
  console.log(JSON.stringify(places, null, 3))
  console.log(JSON.stringify(images, null, 3))
}


(async () => {
  importPhotos()
})()