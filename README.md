# WatchEnsemble

Watch Ensemble allows you to watch videos together with your friends online. Watch Ensemble synchronizes video playback using a websocket.

## Usage

```
go run main.go

docker build -t watchensemble .
docker run -p 8080:8080 watchensemble
```

## Websocket Docs

Endpoint: `/ws?clientId=EXAMPLE_ID`

**setPlaybackState**: Report to server after user changed playback state or server tells client to change state

```json
{
    "type": "setPlaybackState",
    "text": "playing|paused|waiting",
    "client": "<client>",
    "date": "..."
}
```

**requestVideo**: Client requests video by url

```json
{
    "type": "requestVideo",
    "text": "<url>",
    "client": "<client>",
    "date": "..."
}
```

**setVideoDetails**: Server sends new video with details to all clients

```json
{
    "type": "setVideoDetails",
    "videoDetails": {
        "title": {"de": "<video title>"},
        "description": {"de": "<video description>"},
        "url": {"de": "<video url>"},
        "languages": ["de"],
    },
    "client": "<client>",
    "date": "..."
}
```

**jumpToTime**: Report to server after user jumped to time and server transmits to all clients

```json
{
    "type": "jumpToTime",
    "seconds": 163,
    "client": "<client>",
    "date": "..."
}
```

**reportStatus**: Clients reports every 5 seconds current status

```json
{
    "type": "reportStatus",
    "status": {
        "playbackState": "playing|paused|waiting",
        "currentTime": 163
    },
    "client": "<client>",
    "date": "..."
}
```

## Meta

Lucas Hild - [https://lucas-hild.de](https://lucas-hild.de)  
This project is licensed under the MIT License - see the LICENSE file for details