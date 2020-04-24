package sources

import "testing"

func TestMp4CanHandle(t *testing.T) {
	if mp4CanHandle("https://example.com/video.mp4") != true {
		t.Errorf("Mp4 was supposed to handle link")
	}

	if mp4CanHandle("https://example.com/video.mp4wrong") != false {
		t.Errorf("Mp4 was not supposed to handle link")
	}
}

func TestMp4Get(t *testing.T) {
	videoDetails, err := mp4Get("https://example.com/video.mp4")
	if err != nil {
		t.Errorf("Got error: %v", err)
	}

	if videoDetails.Title["undefined"] != "Video from example.com" {
		t.Errorf("Mp4 video details title, got: %v, want: %v", videoDetails.Title["undefined"], "Video from example.com")
	}

	if videoDetails.Source != "mp4" {
		t.Errorf("Mp4 video details source, got: %v, want: %v", videoDetails.Source, "mp4")
	}

	if videoDetails.Description["undefined"] != "" {
		t.Errorf("Mp4 video details description, got: %v, want: %v", videoDetails.Description["undefined"], "")
	}

	if videoDetails.URL["undefined"] != "https://example.com/video.mp4" {
		t.Errorf("Mp4 video details url, got: %v, want: %v", videoDetails.URL["undefined"], "https://example.com/video.mp4")
	}

	if videoDetails.Languages[0] != "undefined" {
		t.Errorf("Mp4 video details languages, got: %v, want: %v", videoDetails.Languages, []string{"undefined"})
	}
}
