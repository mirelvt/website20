CSS_OBJ = static/css
SASS_OBJ = scss

CSS_DEPS = $(wildcard $(SASS_OBJ)/_*.scss)
CSS_SRCS = $(filter-out _%, $(notdir $(wildcard $(SASS_OBJ)/*.scss)))
CSS_MIN_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.min.css, $(CSS_SRCS))
CSS_PUBLIC_OBJS = public/css/*.min.css
all: $(CSS_MIN_OBJS)

$(CSS_OBJ)/%.min.css: $(SASS_OBJ)/%.scss $(CSS_DEPS)
	scss --sourcemap=none --style compressed $< $@

# %.min.js: %.src.js
# 	uglifyjs --comments -c hoist_vars=true,join_vars=true -m -r '$$' -o $@ $<

clean:
	rm -f $(CSS_MIN_OBJS) $(CSS_PUBLIC_OBJS)


.PHONY: clean all

.SUFFIXES:
.SUFFIXES: .min.css




