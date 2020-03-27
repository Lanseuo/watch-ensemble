package sources

import (
	"regexp"
)

var re = regexp.MustCompile(`youtube\.com\/watch\?v=(\w{11})`)

func youtubeCanHandle(url string) bool {
	return re.MatchString(url)
}

func youtubeGet(url string) (details VideoDetails, err error) {
	videoID := re.FindStringSubmatch(url)[1]

	language := "undefined"

	details.Title = make(map[string]string)
	details.Title[language] = "Video from YouTube"
	details.Description = make(map[string]string)
	details.URL = make(map[string]string)
	details.URL[language] = videoID
	details.Languages = append(details.Languages, language)
	details.Source = "youtube"

	return details, nil
}
