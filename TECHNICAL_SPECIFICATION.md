# Technical Specifications

## Project

* **Name:** Notes
* **Version:** 1.0
* **Author:** Kostiantyn Peschanov (c_simm@icloud.com)
* **Date:** 2023-10-09

## Objective

To develop a web application for storing and organizing notes. The application should allow users to create, edit, delete, filter, search, create tags and categories for notes, and import and export notes in JSON and CSV formats.

## Technical Requirements

* **Platform:** Web
* **Web technologies:** Node.js (Nest.js + TypeScript), Vue 3 + TypeScript
* **Database:** PostgreSQL

## Functional Requirements

* **Note creation:** Users should be able to create notes with the following fields:
    * **Title**
    * **Text**
    * **Tags**
    * **Categories**
* **Note editing:** Users should be able to edit any note they have created.
* **Note deletion:** Users should be able to delete any note they have created.
* **Note filtering:** Users should be able to filter notes by the following criteria:
    * **Title**
    * **Text**
    * **Tags**
    * **Categories**
* **Note search:** Users should be able to search for notes by text.
* **Tag creation:** Users should be able to create tags for notes.
* **Category creation:** Users should be able to create categories for notes.
* **Note import and export:** Users should be able to import and export notes in JSON and CSV formats.
* **Admin panel:**
    * **User list:** Admins should be able to view a list of users, including their name, email address, account status, and other data.
    * **Note list:** Admins should be able to view a list of notes, including their title, text, tags, categories, and other data. Admins should also be able to view who has been shared notes with via link or who has open access.
    * **Statistics:** Admins should be able to view statistics about application usage, such as the number of notes created, the number of users, and the number of visits, etc.

## Quality Requirements

* **Security:** The application should be secure and protected from unauthorized access.
* **Stability:** The application should be stable and run without errors.
* **Usability:** The application should be user-friendly.

## Timeline

* **Project implementation deadline:** 1.5 months.

## Additional Information

Additional information that may be useful for project implementation will be provided upon request.