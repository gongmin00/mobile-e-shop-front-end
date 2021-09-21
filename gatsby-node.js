exports.onCreatePage = async ({ page, actions }) => {
    const {createPage} = actions
    //action是一个object，createPage是里面的function之一
    // Make the front page match everything client side.
    // Normally your paths should be a bit more judicious.
    // if (page.path === `/`) {
    //     //如果url path是“/”的时候
    //   page.matchPath = `/*`
    //   createPage(page)
    // }
    if (page.path.match(/^\/auth/)) {
      // Update the page.
      page.matchPath ="/auth/*"
      createPage(page)
    }
  }