## TODO

1-[X]-a) Tokenize the post content into separate sentences and allow the user to label each sentence. This may not be so easy because post content does not always follow punctuation rules; but try and see whether NLTK (or fasttext) has libraries to do this intelligently.

2-[X]-b) Provide some graphic visualization to indicate that a group of sentences belong to a single post (e.g. boundary box for a group of sentences in a post)

3-[X]-c) Provide some highlight color to the selected label for each sentence, so that user can easily determine which ones have been labelled. Example: negative: red, positive: blue, neutral: green. I leave the color scheme up to you

4-[X]-d) Look at rule 3 in my text classification rules. Your app should be able to support labeling of a single sentence or a group of sentences. For the latter, here is my suggestion:

5-[]-Change the update logic at backend

5-[]-Upload new format of posts to the server
