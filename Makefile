OBJ = static
CSS_OBJ = static/css
SASS_OBJ = scss
JS_OBJ = src_js

CSS_DEPS = $(wildcard $(SASS_OBJ)/_*.scss)
CSS_SRCS = $(filter-out _%, $(notdir $(wildcard $(SASS_OBJ)/*.scss)))
CSS_MIN_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.min.css, $(CSS_SRCS))
CSS_PUBLIC_OBJS = $(wildcard public/css/*.min.css)

JS_SRCS = $(notdir $(wildcard $(JS_OBJ)/*.src.js))
JS_MIN_OBJS = $(patsubst %.src.js, $(OBJ)/js/%.min.js, $(JS_SRCS))
STATIC_JS = $(wildcard static/js/*.min.js)
JS_PUBLIC_OBJS = $(wildcard public/js/*.min.js)


all: $(CSS_MIN_OBJS) $(JS_MIN_OBJS)

$(CSS_OBJ)/%.min.css: $(SASS_OBJ)/%.scss $(CSS_DEPS)
	scss --sourcemap=none --style compressed $< $@

$(OBJ)/js/%.min.js: $(JS_OBJ)/%.src.js
	uglifyjs --comments -c hoist_vars=true,join_vars=true -m -r '$$' -o $@ $<

clean:
	rm -f $(CSS_MIN_OBJS) $(CSS_PUBLIC_OBJS) $(JS_PUBLIC_OBJS) $(STATIC_JS)


.PHONY: clean all

.SUFFIXES:
.SUFFIXES: .min.css




