package sources

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"regexp"
)

func arteCanHandle(url string) bool {
	re := regexp.MustCompile(`arte\.tv\/\w\w\/videos\/\d+-\d+-A`)
	return re.MatchString(url)
}

func arteGet(url string) (details VideoDetails, err error) {
	details.Title = make(map[string]string)
	details.Description = make(map[string]string)
	details.URL = make(map[string]string)

	re := regexp.MustCompile(`\d+-\d+-A`)
	videoID := re.FindString(url)

	if videoID == "" {
		return details, errors.New("Can't find video")
	}

	for _, language := range []string{"fr", "de"} {
		apiURL := fmt.Sprintf("https://api.arte.tv/api/player/v1/config/%s/%s?platform=ARTE_NEXT", language, videoID)
		resp, err := http.Get(apiURL)
		if err != nil {
			return details, err
		}

		defer resp.Body.Close()

		type responseMediaVersion struct {
			URL string `json:"url"`
		}
		type responseVideoJSONPlayer struct {
			Title       string                          `json:"VTI"`
			Description string                          `json:"VDE"`
			VSR         map[string]responseMediaVersion `json:"VSR"`
		}
		type responseStruct struct {
			Details responseVideoJSONPlayer `json:"videoJsonPlayer"`
		}
		var response responseStruct
		json.NewDecoder(resp.Body).Decode(&response)

		details.Title[language] = response.Details.Title
		details.Description[language] = response.Details.Description
		details.URL[language] = response.Details.VSR["HTTPS_SQ_1"].URL
		details.Languages = append(details.Languages, language)
	}

	return details, nil
}
