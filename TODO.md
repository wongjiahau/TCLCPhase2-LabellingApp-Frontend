## TODO

1-[X]-a) Tokenize the post content into separate sentences and allow the user to label each sentence. This may not be so easy because post content does not always follow punctuation rules; but try and see whether NLTK (or fasttext) has libraries to do this intelligently.

2-[X]-b) Provide some graphic visualization to indicate that a group of sentences belong to a single post (e.g. boundary box for a group of sentences in a post)

3-[X]-c) Provide some highlight color to the selected label for each sentence, so that user can easily determine which ones have been labelled. Example: negative: red, positive: blue, neutral: green. I leave the color scheme up to you

4-[X]-d) Look at rule 3 in my text classification rules. Your app should be able to support labeling of a single sentence or a group of sentences. For the latter, here is my suggestion:

5-[]-e) Currently, the posts from English sites also contain Malay, and we need to train these separately. Can you include an additional button/label in addition to the 3 sentiment labels to indicate whether the sentence is in Malay/English.

6-[]-Change the update logic at backend

7-[]-Upload new format of posts to the server

8-[]-Use arrow keys on the keyboard to navigate up and down between the posts, and the current  active post is highlighted with a boundary.

9-[X]-Four options: negative, neutral, positive, unclassified.

10-[]-Make all the posts appear with the unclassified option highlighted by default. User needs to use keys: 1, 2 and 3 to select either negative, neutral or positive

11-[]-Each post has merge button, which is selected by clicking on it or pressing the space bar. When this is selected, the current highlighted post and all previous unclassified posts are immediately merged into a single entity. This action is currently undoable.

12-[]-The name of the file will appear at the upper right hand corner of the screen (which currently accommodates max 15 posts). Only posts associated with that particular file will appear on the screen, which means there can be less than 15 at the end of the file. For user to select explicitly file name to classify, will be a later feature.

13-[]-Extra page app to show all the classified posts up to this point of time for all 3 categories: positive, negative and neutral