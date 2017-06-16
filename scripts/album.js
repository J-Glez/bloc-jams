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
        var songNumberAttribute = parseInt($(this).attr('data-song-number'));

            // Set the song to PAUSE
        if (currentlyPlayingSongNumber === null) {
            $(this).html(pauseButtonTemplate);
            setSong(parseInt(songNumberAttribute));
            updatePlayerBarSong();
            // Leave it as PLAY if the song cliked is the one playing
        } else if (currentlyPlayingSongNumber === songNumberAttribute) {
            $(this).html(playButtonTemplate);
            setSong(null);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            // If not the one playing ...  and the one currently playing with Song #
        } else if (currentlyPlayingSongNumber !== songNumberAttribute) {
                // set the cliked row as PAUSE (it is now Playing)
            $(this).html(pauseButtonTemplate);

                // set the song that was playing with Song #
            var currentlyPlayingSongNumberElement = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingSongNumberElement.html(currentlyPlayingSongNumberElement.attr('data-song-number'));

            setSong(parseInt(songNumberAttribute));
            updatePlayerBarSong();
         }
    };

    var onHover = function(event) {
             // this = Current element
             // Both, the element (to manipulate its HTML) and the song # value (to do the comparison) are needed
        var songNumberElement = $(this).find('.song-item-number');
        var songNumberAttribute = parseInt(songNumberElement.attr('data-song-number'));

        if (songNumberAttribute !== currentlyPlayingSongNumber) {
            songNumberElement.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberElement = $(this).find('.song-item-number');
        var songNumberAttribute = parseInt(songNumberElement.attr('data-song-number'));

        if (songNumberAttribute !== currentlyPlayingSongNumber) {
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
    currentAlbum = album;
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

var setSong = function(songNumber) {
    currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
 };

var nextSong = function() {
    // Know what the previous song is. This includes the situation in which the next song is the first song, following the final song in the album (that is, it should "wrap" around).
    // Use the trackIndex() helper function to get the index of the current song and then increment the value of the index.
    // Set a new current song to currentSongFromAlbum.
    // Update the player bar to show the new song.
    // Update the HTML of the previous song's .song-item-number element with a number.
    // Update the HTML of the new song's .song-item-number element with a pause button.
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentIndex++;

    if (currentIndex >= currentAlbum.songs.length) {
        currentIndex = 0;
    }

    var lastSongNumber = parseInt(currentlyPlayingSongNumber);

    setSong(parseInt(currentIndex + 1));
    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = parseInt(currentlyPlayingSongNumber);

    setSong(parseInt(currentIndex + 1));
    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
    //That updates the text of the <h2> tags that contain the song name and the artist name.
    //Reference data from the current song variables to populate them.
    //$('.song-name').html(currentSongFromAlbum.title);
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
