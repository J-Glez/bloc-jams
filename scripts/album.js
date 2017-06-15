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

        // returns the element row (<tr>)
    var $row = $(template);

    var clickHandler = function() {
        var songNumberAttribute = $(this).attr('data-song-number');

            // Set the song to PAUSE
        if (currentlyPlayingSong === null) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumberAttribute;
            // Leave it as PLAY if the song cliked is the one playing
        } else if (currentlyPlayingSong === songNumberAttribute) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
            // If not the one playing ...  and the one currently playing with Song #
        } else if (currentlyPlayingSong !== songNumberAttribute) {
                // set the cliked row as PAUSE (it is now Playing)
            $(this).html(pauseButtonTemplate);

                // set the song that was playing with Song #
            var currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingSongElement.html(currentlyPlayingSongElement.attr('data-song-number'));

            currentlyPlayingSong = songNumberAttribute;
         }
    };

    var onHover = function(event) {
             // this = Current element
             // Both, the element (to manipulate its HTML) and the song # value (to do the comparison) are needed
        var songNumberElement = $(this).find('.song-item-number');
        var songNumberAttribute = songNumberElement.attr('data-song-number');

        if (songNumberAttribute !== currentlyPlayingSong) {
            songNumberElement.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberElement = $(this).find('.song-item-number');
        var songNumberAttribute = songNumberElement.attr('data-song-number');

        if (songNumberAttribute !== currentlyPlayingSong) {
            songNumberElement.html(songNumberAttribute);
        }
    };

        // Find the song number cell and assign the EVENT (defined above)
    $row.find('.song-item-number').click(clickHandler);

        // the whole row.  No need to find a child element; passing 2 functions defiend above
    $row.hover(onHover, offHover);

    return $row;
};

var setCurrentAlbum = function(album) {
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});
