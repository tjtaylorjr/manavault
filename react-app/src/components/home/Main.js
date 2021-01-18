import React from "react";
import '../../stylesheets/index.css';
import Footer from "../static/Footer";
import SearchBar from "../search/SearchBar";

const Main = () => {

  return (
    <>
      <div className="splash">
        <div className="splash-contents">
          <div className="splash-background">
            <div className="splash-search">
              <SearchBar />
            </div>
          </div>
          <div className="disclaimer">
            <p>Art featured on this page is Ancient Hellkite and was illustrated by Jason Chan.  Portions of the materials used on this site, including Ancient Hellkite, are property of Wizards of the Coast. ©Wizards of the Coast LLC.</p>
            <p>Wizards of the Coast, Magic: The Gathering, and their logos are trademarks of Wizards of the Coast LLC in the United States and other countries. © 1993-2021 Wizards. All Rights Reserved.</p>
            <p>This site is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC. We may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under Wizards' Fan Site Policy. MAGIC: THE GATHERING® is a trademark of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards' trademarks or other intellectual property, please visit their website at https://company.wizards.com/.</p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Main;
