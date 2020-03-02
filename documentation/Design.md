# Design

## Testing

Test cases during development can be found in the Test Cases excel file.

## Limitations

Immediately, I notice that saving the configuration inside a text file would anchor me to a server, creating unnecessary work, when state could be saved in localstorage, client-side. There would be no issues generated using this approach, hence why I have chosen to use this format.

Another I notice is dropping a gold coin inside a room. This seems very unusual, so I will provide a minimap, which a user can look at to see previously visited rooms.

## Future Improvements

As for future versions, more items should be added so that duplicate items are not found as frequently, and to balance the game out. I could add in better combat mechanics, rather than just auto fighting enemies.

## Functionality

After reading the brief, I would create a maze within a set matrix, whereby the passages and rooms are created using an algorithm for actual maze generation.

-   The game will automatically save every time the user moves to another room.
-   The user will be placed in a random room, and the exit will be the furthest, that is, the hardest to reach room.
-   The rooms will randomly have different items, gold or enemies (referred to in-code as entities) to interact with, added in after maze generation.
-   The user will be able to move using the WASD keys, moving a character around the room.
-   The user will have certain stats, generated randomly when a new game is created.
-   The user will have an inventory, that will store gold and items collected along their journey.
    -   A user can consume or equip items from this inventory.
-   The user will have a set amount of health, which will fall when the user takes damage, and will rise when they use a potion.
-   The user will be able to find the end of the maze. Upon interacting with the exit, the game will end, displaying how much gold they collected.
-   The game will end if the user's health falls below 0.

## User Interface

The user will see 4 panels.

1. The map (or current room)

    - The map will have a settings icon. Clicking this icon will open up a settings menu.
    - The user will be able to move around the map using WASD keys.
    - The user will be able to move between rooms by approaching a door and pressing space.
    - The user will be able to interact with the entity in the middle of the room by pressing space.

2. The dialogue box

    - The user will be presented with a message each time a new room is entered, describing what is in the current room.
    - The user can scroll back to previous messages using the mouse wheel.

3. The minimap

    - The user can look at the minimap to see all previously visited rooms, showing their respective passages.
    - The minimap will automatically center the to the room the player is in.
    - The user will be able to pan the minimap by dragging it (holding left click and moving the mouse around)
    - The user will be able to zoom in and out of the minimap by using the mouse wheel.
        - Upon panning or zooming, the minimap will no longer automatically move upon entering a room. A small icon will appear in the bottom left of the minimap panel. Clicking this icon will reset the zoom and panning of the minimap.

4. The player information panel. This panel is split into 3 smaller panels:
    1. The stats panel
        - The stats panel will display the users stats, bonus stats, and user sprite.
    2. The inventory panel
        - The inventory panel will display all of the items that the user has collected.
        - A user will be able to click on an item to consume or equip it.
        - Hovering over an item will display information about it.
    3. The equips panel
        - Upon equipping a weapon or armor piece, it will appear here, and will reflect the bonus stats in the stats panel.
        - You can hover over an equipped item to view more information about it.
        - You can click an item here to unequip it.
