# Anki Realisation

Made by : 

Manon GARDIN : RinjieMX on Github,
Tiphaine KACHKACHI : Tiphk on Github,
Matias OTTENSEN : Mattcodman on Github

Brief description of your project.

## Table of Contents

- [Introduction](#introduction)
- [Package](#feature-package)
- [Facts](#feature-fact)
- [Study Now](#feature-study-now)
- [Statistiques](#feature-statistics)
- [Achievements](#feature-study-now)
- [Help](#feature-help)
- [Contributing](#Contribution)

## Introduction

The Anki project involves managing course packages of varying difficulty levels across multiple subjects. Each package contains a multitude of questions and answers that the user must learn. Our implementation of Anki encompasses all its main functionalities, from managing a package and its facts to recording the difficulties the user encountered during reviews of the package's facts. It also includes creating charts that connect the user's overall progress.

## Home Page

The Home page is the page the user sees first. It displays all most important navigations to other pages using buttons, such as the Explore-Lessons page, the StudyNow page, the Statistics page and the Help-Documentation page.

![Alt Text](./frontend/src/assets/screenshots/home.png)

## All Features

## Feature Package

In the Packages drop-down bar, we can find two options.
The first option displays the list of all Packages in the database. All information about a package is displayed.
We can either See the facts linked to this particular package, or edit the package.

![Alt Text](frontend/src/assets/screenshots/package-images/a_package.png)

On the right of the page we can see multiples options of filter. All the filter options can be combined. If I want to see all package made for Children in History, I can !

![Alt Text](frontend/src/assets/screenshots/package-images/display_package.png)

If no Package exist in all the filter option, the page allows you to go add a new Package:

![Alt Text](frontend/src/assets/screenshots/package-images/no_package_found.png)

Now let's see what happens when we click on 'Edit Package':

![Alt Text](frontend/src/assets/screenshots/package-images/edit_package.png)

All information about a package is displayed. Here we are offered 2 choices, either we edit the package or we can delete it.
First let's edit the package.

### Edit package

![Alt Text](frontend/src/assets/screenshots/package-images/we_are_editing_package.png)

The display will change, and we can now change all values. The title can't be empty. If you try to empty the title of the package, the modification won't be executed.
On the other hand, a description can be empty.
If we decided to cancel our changes, we can click on the button cancel. This will bring us back to the previous version of the Package.

Let's go back to our list of all packages to make sure the changes worked. To do it faster, we can use the back button.

![Alt Text](frontend/src/assets/screenshots/back-button.png)

### Delete Package

Now what happens if we would like to delete a Package ?
On the 'French History' Package for example, if we hit the button Delete Package, a popup appears.

![Alt Text](frontend/src/assets/screenshots/package-images/delete_this_package.png)

If we press ok, we get redirected to the list of all packages, and the French History package is nowhere to found. 
In another page that we will present later on, we have access to a drop-down bar that list all names of all packages found. As we can see, French History was deleted.

![Alt Text](frontend/src/assets/screenshots/package-images/all_new_packages.png)

Now that we saw all features related the manipulation of Packages, we can go and see their associated facts. To do so, simply click on the 'See facts' button in a Package.
This will transfer us to another page that we will analyse in the next section.

![Alt Text](frontend/src/assets/screenshots/package-images/go_to_see_facts.png)

### Add Package

In the Package section in the navbar, we also have the choice to create a new Package. 

![Alt Text](frontend/src/assets/screenshots/package-images/new_package.png)

A little * indicate us what field is required in order to create a new package. If not all * fields are completes, a small reminder pops up. 

![Alt Text](frontend/src/assets/screenshots/package-images/reminder_required.png)

For Category, Target Audience and Difficulty we need to choose between the options, but for Title and Description we are free to input whatever.

![Alt Text](frontend/src/assets/screenshots/package-images/select_category.png)

It's important to note that if we don't select anything for field that isn't required, the default value will be chosen for the package. 
For the description field, if nothing is written, the description will state that nothing was provided.
By default, the value for difficulty is Undefined and the value for target audience is Any.

After clicking on the Add button, a small text informs us that the package was successfully created. This message disappear after few seconds.

![Alt Text](frontend/src/assets/screenshots/package-images/package_added.png)

## Feature Fact

We were on the Explore Lessons page, and we decided to click on the 'See Facts' button. 
This opens a page that displays all facts linked to the package we clicked on appears.

![Alt Text](frontend/src/assets/screenshots/fact-images/all_facts_inside_package.png)

We, just like on the package interface, have multiple options to choose from. If we decide to add a new fact, a new component will appear at the top in which we can directly enter the questions/responses :

![Alt Text](frontend/src/assets/screenshots/fact-images/create_fact.png)

To add the fact we simply click 'Commit':

![Alt Text](frontend/src/assets/screenshots/fact-images/add_fact_complete.png)

We can click 'Edit' again to modify the fact. 
If we want to delete the fact we simply click on the button. A pop-Up will appear asking us if we are sure.

![Alt Text](frontend/src/assets/screenshots/fact-images/delete_fact.png)

If we confirm the fact gets deleted. 

## Feature Study Now

Discover now the "Study Now" page, the centerpiece of our app. It is here that we will dive into the heart of the subject and review the facts that we have recorded in our packs.
The "Study Now" page will take you to an existing and not empty package. Otherwise, you will see a page informing you that no package is available, or that it is empty.

![Alt Text](frontend/src/assets/screenshots/nomorefact.png)

![Alt Text](frontend/src/assets/screenshots/nomorepackage.png)

You can easily change a package by selecting it from the drop-down menu at the top left of the screen.

![Alt Text](frontend/src/assets/screenshots/combobox.png)

When studying the information, it is important to note that the facts will be presented in random order in the package. The question will be displayed, but the answer will remain hidden. To reveal it, just click on the "Reveal" button. At that time, you will also be able to indicate your level of confidence in your answer to the question by using the corresponding buttons, and you will move on to the next question.

![Alt Text](frontend/src/assets/screenshots/bouton-ressenti.png)

Your choice of trust level will determine how long before the issue reappears in the revision session. The revision time will correspond to the value indicated on the button you have selected. If you prefer to proceed to the next question without answering it, simply click on "Next Question".

## Feature Statistics

Each of the graphics use the same code color. With red and pink behind attributed to low distribution, light green and green are used for high distribution. 

This graphics displays each difficulty level and how much the user chose it for each package.
This is a good way for the user to follow his progress, as he can see how many fact he though were 'difficult' for example in a certain package.
*Don't forget to go on Study Now and rate some facts for the graph to be filled !*

![Alt Text](frontend/src/assets/screenshots/statistiques/progress_stats.png)

Here is the facts statistics chart. Is shows the amount of fact contained in every packages. 

![Alt Text](frontend/src/assets/screenshots/statistiques/fact_stats.png)

In this last chart, we display the distribution of all Categories on all the packages. On the right corner, we have an option to display the same graphics but for the distribution of Target Audience and Difficulty Level.

![Alt Text](frontend/src/assets/screenshots/statistiques/category_stats.png)
![Alt Text](frontend/src/assets/screenshots/statistiques/target_audience_stats.png)
![Alt Text](frontend/src/assets/screenshots/statistiques/difficulty_level_stats.png)


## Feature Achievements

If a user select a type of difficulty for each facts in a package, the Package will be listed in the Achievements page.
This means every Package who is in the 'waiting' list of packages will be displayed here. (All package whose study page shows it's done for now).

![Alt Text](frontend/src/assets/screenshots/achievements/all_packages_done.png)

The Achievement shows every package that the user finished. If a fact is added to a package, and the user go to study the package in Study Now, it will be detected and won't figure anymore in the achievement page as it is no longer finished.
In the same way, after the time attributed to each fact difficulty is over days, the fact come back to Study Now, thus the package's fact is removed from the achievements.

![Alt Text](frontend/src/assets/screenshots/achievements/no_package_done.png)


## Feature Help

This section introduces the functionality our website, explaining a little bit of every feature, so that the user understands whe he needs to do, and how to do it.

![Alt Text](frontend/src/assets/screenshots/Features/Help_about.PNG)

In this part of our application, the user can find a lot of documentation/websites for each category of subject. The link are not dynamically related to the database, we add them through html. 
It allows to get even more knowledge for all type of subject.

![Alt Text](frontend/src/assets/screenshots/Features/help_documentation.PNG)


## Contribution




Manon created the skeleton of the project, allowing navigation between pages, creating the NavBar that remains common to each page. 
In the Database area, she created the 'CreaPark' file and performed the initial inserts. Tiphaine used this work to add a lot of new inserts to have a better basis for our graphs.
For the Backend, Manon was in charge of developing APIs in the 'app.ts' file. She also crafted the 'DBManager.ts' file, for the backend structure.
Regarding the Frontend development:
- Manon developed the 'display-package' page.
- She implemented the feature for adding new packages.
- She created the 'display-fact' component.
- She managed the addition, deletion, and modification of facts.
- She developed the 'Study-now' component, including the algorithm for the random display of facts and time interval management.

In the Statistics section of the project, Manon developed a graph that shows the number of facts per package, which is displayed on the 'Facts Statistics' page.

Tiphaine took care of all visual aspect of the website, except for the Study-Now page which was done my Manon. Overall, every Html and css file was re-done by Tiphaine for each page on the website.
Tiphaine also took care of the Editing (edit and delete) of a Package, to the visual interface, the api calls needed and all methods needed for the successfull deletions of a package regarding the foreign key between the package and fact.
Another task is the Achievements Page, who was entirely done by Tiphaine, from the visual to the api calls and logic methods.
Then Tiphaine did the Package Statistics page and made it even more dynamic by adding a dropdown to change the content of the graphics. Regarding the other Graphics made by Matias and Manon, Tiphaine modified the color and placement of the graphs on the page, for it to be more beautiful and centered.
Finally, Tiphaine took care of re-designing all the Help pages that were created by Matias to match the aesthetic of the website, and updated all content who was previously made for the Help page to a more complete, usefull and appropriate version.

Concerning the statistics part, it was mostly done by Matias. It includes the importation of the Highcharts packages, the modeling of the charts, etc. His work was to gather as much data as possible in the whole application and to present it in different charts. 
It was necessary to use the backend app.js API to link data from different files across the frontend, import data, and store it in the charts. 
Tiphaine did the category/target/difficulty chart, and Manon helped Matias set the links between the chart and the app information. The most challenging part was making the data dynamic. This part took a lot of time.

The ReadMe file was created by Tiphaine and was then edited by each member, all working on their own part like in the project.
The BuildMe file was created by Tiphaine and Manon, and the ToDoList which was a easy way to check the progress was created by Tiphaine and regular updated by every member.



