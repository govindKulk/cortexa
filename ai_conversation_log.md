### Copilot Conversations

- 1. Initial copilot prompt to scaffold the project


> i am planning to create a mobile application using react native expo. which is named cortexa which is an ai recommendation app for produts, i have catalog data in data/skus.json which includes lists of products. i need to render the input on the home screen and a button with ai star beside it. user can type inside the input after hitting the button , it makes an api call (don't implement this right way now) , and input and button goes down to the screen , and a skeleton for ui shows while data is beign fetched then after data comes it renders the card for the products,.
> 
> use reactnative reanimated for the animation , use best practices for theming styling, i have setup nativewind for tailwind like sty

'''

- 2. Tried fixing the UI issue with screenshot but didn't work

> ive attached the sccreen shot of the search results , which is showing blank place above the product cards and new search button.
lets change this behaviour.
i want the input to animate to the top of the screen in smooth manenr, header to get invisible, and remaining space should be taken by the productcards
> screenshot.png


- 3. Initial implementation for the fileter and sorting functionality.
> Now ive to implement the filters and sort by functionality,
the filters should have these options:
> - 1. price range filter
> - 2. category selector
> - 3. brand picker
> sort by : we only have one option to sort by i.e price. as we dont have date of the products so we can't sort by on newest. so just do onething add two options; price , and date posted or latest , just add the action option even if it is not working. the first one should work properly.

> now these filters and sort by shoudl be visible once product search is complete and llm has returned the products data, then may be based on the returned product, get there categories, brands, prices to update the filters and sort by price lowest ot highest and vice versa.
create sepearte functions to extract these details from returned product and handle edge cases when returned prodcut array would be empty.

> on the ui part two buttons should be visible iwth proper icons , use (components from react-native-paper) . arranged in flex-row in one single row.
then clicking on which dropdown pickers should be visible which in turn contains all these filters.
that's it.


- 4. some fixes with filters


```
there are several issues in it.
1. filters are not showing . like what i'd described for having two buttons filters and sort by with icons are not visbile
2. the flatlist is having major performance isses, sometimes it is showing nothng, sometimes it satarts blinking and then when i scroll it bit it stops blinkin and shows the list of products,
although the default filters seems to be getting applied as it is shwoing products sort by price low to high which is the default filter.
but it is having majort problems, may be with changing state and how we are memoizing and some native flatlist related issues.
please go through the issues, and fix them  also.
for the sake of testing ive disabled real llm function calls, instead i have mocked api call with 2 second delay and then i am setting the products state with all the 51 prodcuts. 
```