const fs = require('fs');
const path = require('path');

const albumsDir = './music/albums';
const singlesDir = './music/singles';
const otherTracksDir = './music/other tracks';
const lyricsDir = './lyrics';

// 获取目录中的所有子目录
const getSubdirectories = (dir) => {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(subDir => fs.statSync(path.join(dir, subDir)).isDirectory())
    : [];
};

const getAlbums = (dir) => {
  return getSubdirectories(dir).map((albumDir, index) => {
    const albumPath = path.join(dir, albumDir);
    const coverImage = `/music/albums/${albumDir}/${albumDir.replace(/^\d{2} /, '')}.jpg`;
    
    const songs = fs.readdirSync(albumPath)
      .filter(file => file.endsWith('.mp3'))
      .map((file) => {
        const songTitle = file.replace(/^\d{2} /, '').replace('.mp3', '');
        const songPath = `/music/albums/${albumDir}/${file}`;
        const lyricPath = `/lyrics/albums/${albumDir}/${file.replace('.mp3', '.htm')}`;
        return { title: songTitle, src: songPath, lyrics: lyricPath };
      });

    return songs.length > 0 ? { id: index + 1, title: albumDir.replace(/^\d{2} /, ''), cover: coverImage, songs } : null;
  }).filter(album => album !== null);
};

const getSingles = (dir) => {
  const singles = [];

  const singleDirs = fs.readdirSync(dir).filter(singleDir => 
    fs.statSync(path.join(dir, singleDir)).isDirectory()
  );

  singleDirs.forEach((singleDir, index) => {
    const singlePath = path.join(dir, singleDir);
    const coverImage = path.join(singlePath, `${singleDir.replace(/^\d{2} /, '')}.jpg`);

    // 获取不同版本
    const versions = fs.readdirSync(singlePath)
      .filter(subDir => fs.statSync(path.join(singlePath, subDir)).isDirectory())
      .map(versionDir => {
        const versionPath = path.join(singlePath, versionDir);
        const versionCover = path.join(versionPath, `${versionDir}.jpg`);

        const songs = fs.readdirSync(versionPath)
          .filter(file => file.endsWith('.mp3'))
          .map(file => {
            const songTitle = file.replace(/^\d{2} /, '').replace('.mp3', '').replace('2-59', '2:59');
            const songPath = path.join(versionPath, file);
            const lyricPath = path.join(lyricsDir, 'singles', singleDir, versionDir, `${file.replace('.mp3', '.htm')}`);

            return {
              title: songTitle,
              src: '/' + songPath.replace(/\\/g, '/'),
              lyrics: '/' + lyricPath.replace(/\\/g, '/'),
            };
          });

        return {
          title: versionDir,
          cover: '/' + versionCover.replace(/\\/g, '/'),
          songs
        };
      });

    singles.push({
      id: index + 1,
      title: singleDir.replace(/^\d{2} /, ''),
      cover: '/' + coverImage.replace(/\\/g, '/'),
      versions
    });
  });

  return singles;
};

const getOtherTracks = (dir) => {
    const coverImage = `/music/other tracks/Rare Tracks.jpg`;
    
    const songs = fs.readdirSync(dir)
      .filter(file => file.endsWith('.mp3'))
      .map((file) => {
        const songTitle = file.replace(/^\d{2} /, '').replace('.mp3', '');
        const songPath = `/music/other tracks/${file}`;
        const lyricPath = `/lyrics/other tracks/${file.replace('.mp3', '.htm')}`;
        return { title: songTitle, src: songPath, lyrics: lyricPath };
      });

    return songs.length > 0 ? songs : null;
};

// 生成 albums.js 文件
const generateAlbumsFile = () => {
  const albums = getAlbums(albumsDir);
  const singles = getSingles(singlesDir);
  const otherTracks = getOtherTracks(otherTracksDir);

  const content = `const albums = ${JSON.stringify(albums, null, 2)};
const singles = ${JSON.stringify(singles, null, 2)};
const otherTracks = ${JSON.stringify(otherTracks, null, 2)};

export { albums, singles, otherTracks };`;

  fs.writeFileSync('../src/data/albums.js', content, 'utf-8');
  console.log('albums.js file has been generated.');
};

generateAlbumsFile();
