/* globals expect, driver, assert */

describe("gui", function () {
  describe("parseUrlAnchors", function () {
    it('should override hash params with query params', function() {
      // TODO
    });

    it('should parse present action from hash', function() {
      // TODO
    });
  });

  describe("updateUrlQueryString", function () {
    function setUrl(window, url) {
      window.history.pushState("test", "test", url);
    }

    describe("public project", function () {
      it("should set public URL", function () {
        const project = {
          owner: "test",
          name: "PublicProject",
          state: "Public",
          saveState: "Saved",
        };
        driver.ide().updateUrlQueryString(project);

        const { window } = driver.globals();
        const url = window.location.href;
        assert(url.includes("ProjectName=PublicProject"));
        assert(url.includes("Username=test"));
      });

      it("should preserve hash", function () {
        const { window } = driver.globals();
        const initialHash = "#thisIsATest";
        const initialUrl = window.location.origin + window.location.pathname +
          "?" + initialHash;
        setUrl(window, initialUrl);
        const project = {
          owner: "test",
          name: "PublicProject",
          state: "Public",
          saveState: "Saved",
        };
        driver.ide().updateUrlQueryString(project);

        const url = window.location.href;
        assert(url.includes("ProjectName=PublicProject"));
        assert(url.includes("Username=test"));
        assert(url.includes(initialHash));
      });

      it("should preserve hash", function () {
        const { window } = driver.globals();
        const initialHash = "#thisIsATest";
        const initialUrl = window.location.origin + window.location.pathname +
          "?" + initialHash;
        setUrl(window, initialUrl);
        const project = {
          owner: "test",
          name: "PublicProject",
          state: "Public",
          saveState: "Saved",
        };
        driver.ide().updateUrlQueryString(project);

        const url = window.location.href;
        assert(url.includes("ProjectName=PublicProject"));
        assert(url.includes("Username=test"));
        assert(url.includes(initialHash));
      });

      it("should preserve other query params", function () {
        const { window } = driver.globals();
        const queryParam = `extensions=${encodeURIComponent('["someUrl"]')}`;
        const initialUrl = window.location.origin + window.location.pathname +
          "?" + queryParam;
        setUrl(window, initialUrl);

        const project = {
          owner: "test",
          name: "PublicProject",
          state: "Public",
          saveState: "Saved",
        };
        driver.ide().updateUrlQueryString(project);

        const url = window.location.href;
        assert(url.includes("ProjectName=PublicProject"));
        assert(url.includes("Username=test"));
        assert(url.includes(queryParam));
      });

      it("should support hash & no query string", function () {
        const { window } = driver.globals();
        const initialHash = "#thisIsATest";
        const initialUrl = window.location.origin + window.location.pathname +
          initialHash;
        setUrl(window, initialUrl);

        const project = {
          owner: "test",
          name: "PublicProject",
          state: "Public",
          saveState: "Saved",
        };
        driver.ide().updateUrlQueryString(project);

        const url = window.location.href;
        assert(url.includes("ProjectName=PublicProject"));
        assert(url.includes("Username=test"));
        assert(url.includes(initialHash));
      });

      it.only("should support (empty) hash", function () {
        const { window } = driver.globals();
        const initialHash = "#";
        const initialUrl = window.location.origin + window.location.pathname +
          initialHash;
        setUrl(window, initialUrl);

        const project = {
          owner: "test",
          name: "PublicProject",
          state: "Public",
          saveState: "Saved",
        };
        driver.ide().updateUrlQueryString(project);

        const url = window.location.href;
        assert(url.includes("ProjectName=PublicProject"));
        assert(url.includes("Username=test"));
        assert(url.includes(initialHash));
      });
    });

    it("should clear project name, username if project is private", function () {
      const { window } = driver.globals();
      const initialHash = "#thisIsATest";
      const initialUrl = window.location.origin + window.location.pathname +
        "?action=present&ProjectName=PublicProject&Username=test" + initialHash;
      setUrl(window, initialUrl);

      const project = {
        owner: "test",
        name: "PrivateProject",
        state: "Private",
        saveState: "Saved",
      };
      driver.ide().updateUrlQueryString(project);

      const url = window.location.href;
      assert(!url.includes("Username=test"));
      assert(url.includes(initialHash));
    });
  });
});
