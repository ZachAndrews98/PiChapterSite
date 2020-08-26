[![Netlify Status](https://api.netlify.com/api/v1/badges/475abea0-2d43-4871-9f85-11f895e88041/deploy-status)](https://app.netlify.com/sites/alleghenyfiji/deploys)

# Allegheny Fiji Website

## About

This website is a mild hodgepodge of Jekyll, Liquid, custom CSS, and Bootstrap.
Due to this, some elements are likely to break under certain conditions. However,
it does work right now and the more complex liquid coding (brothers.html) is
rather self explanatory once you learn the basics of liquid.

## Editing

### General Edits

There are several configurable pieces of information on the website. These items
can be viewed at `_data/site_info.yml`.

The main two items which may need to be edited/changed is the information for
Pig Dinner and the pages on the Navigation bar. For adding pages, follow the
format of the elements that already exist. If you add a page make sure it is
placed within `_pages` and the page has a `permalink: /path-to-page` in the
front matter at the top of the page. If there is no details for Pig Dinner for a
field, "To be announced" is used as a placeholder.

### Brothers/Cabinet Edits

To update the information on the `/brothers` or `/cabinet` pages go to either
the `brothers.yml` or `cabinet.yml` files within `_data`.

To add a brother, follow the given format and supply the brother's name, class,
major, and minor. Then add an image of that brother, named `last-name.jpg` to
their class year within `/assets/images/brothers/`. If the class year does not
exist, make a new folder. If possible try to use images from Fraternal
Composites, but if this is not possible, try to use a professional image.

To update Cabinet, simply replace the prior brother's name with the new
brother's and update the class year if necessary.

## Help

If any help is needed, reach out to the insane man who designed and wrote the
code for this site. His information should be easy to find in the source code if
this repository is no longer still attached to his Github account. If this is
not the case it should be even easier to get help, so reach out.
