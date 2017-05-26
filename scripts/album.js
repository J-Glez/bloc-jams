var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     return template;
 };

var setCurrentAlbum = function(album) {
      var albumTitle = document.getElementsByClassName('album-view-title')[0];
      var albumArtist = document.getElementsByClassName('album-view-artist')[0];
      var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
      var albumImage = document.getElementsByClassName('album-cover-art')[0];
      var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

      albumTitle.firstChild.nodeValue = album.title;
      albumArtist.firstChild.nodeValue = album.artist;
      albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
      albumImage.setAttribute('src', album.albumArtUrl);

      albumSongList.innerHTML = '';

      for (var i = 0; i < album.songs.length; i++) {
          albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      }
  };

var findParentByClassName = function(element, className) {
    if (element) {
        var parentOfElement = element.parentElement;

        while (parentOfElement.className !== className && parentOfElement.className !== null) {
            parentOfElement = parentOfElement.parentElement;
        }
        return parentOfElement;
    }
};

var getSongItem = function (element) {
    // should take an element (could be Child, Parent, Sibling or itself)
    // get the element's className
    // use a switch statement that returns the element with the .song-item-number class (depending on relationship with element)
    // Return the Song item # element

    var elementclassName = element.className;

    switch (elementclassName) {
        case 'song-item-number':
                // user clicked on the song # cell: ITSELF
            return element;

        case 'ion-play':
                // user clicked on the play icon: CHILD
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');

        case 'ion-pause':
                    // user clicked on the pause icon: CHILD
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');

        case 'song-item-title':
                // user clicked on the title cell.  SIBLING.
                // need to get the sibling's parent which will be the parent of 'song-item-number'
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');

        case 'song-item-duration':
                // user clicked on the duration cell.  SIBLING.
                // need to get the sibling's parent which will be the parent of 'song-item-number'
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');

        case 'album-view-song-item':
                // user clicked on ROW.  PARENT
                // No need to get the I just need to get the cell for 'song-item-number'
            return element.querySelector('.song-item-number');
        }
};

var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
console.log(songItem);

    if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
            // Only do this for any song Row
        if (event.target.parentElement.className === 'album-view-song-item') {
                // 1- the play icon shows as item #
                // 2 - if the play was clicked the and icon is pause we need to leave it as pause
            if (currentlyPlayingSong === getSongItem(event.target).getAttribute('data-song-number')){
                event.target.parentElement.querySelector('.song-item-number').innerHTML = pauseButtonTemplate;
            }
            else {
                event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            }
        }
    });

    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
                // Set the song item element back to a number (unless it is the playing song)
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');

            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });

        songRows[i].addEventListener('click', function(event) {
             clickHandler(event.target);
         });
    }
};
