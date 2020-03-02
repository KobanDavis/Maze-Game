# Maze Game Guide

## Quickstart

Open up the `index.html` file in the `/dist` folder. The game will start in the browser.

Or alternatively, run the development build, by running:

```
yarn install
```

followed by

```
yarn start
```

or

```
npm install
```

followed by

```
npm run start
```

## Start

### Menu

After following the previous steps, you will see a menu that will give you the option to start a new game. However, if you played before and didn't finish your game, you will have to option to resume progress.

### In-game

Okay, now we're getting started. You will see 4 different panels. Let's go over them now.

#### The Map

In the top left, you'll see the main map. Here, you will run around as your little character and collect gold, items, and slay enemies. You can move around by using the <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys.

You'll notice there are passages on each face of the room you're in - these lead to other rooms. You can use the passage by aproaching it and pressing <kbd>space</kbd>.

Items and enemies will spawn in the center of the room. You can interact with them by approaching them and by pressing <kbd>space</kbd>.

If you come into contact with an enemy, the passages will be blocked. You'll have to slay the enemy to continue. You can do this by interacting with the enemy. Doing this will show you a new screen, where you will automatically fight the enemy. If your health falls below 0, you'll die. If the enemies health falls below 0, it will die. Simple.
Fighting can sometimes be hard, but once you collect armor and a weapon, it'll be much easier.

If you take damage when fighting, you can restore your heath by drinking a potion. You can also do this during the fight!

#### The dialogue box

In the bottom left, you will see a dialogue box. When you visit a new room, a message will appear in this box that will give you a small analysis of everthing inside the room. It will also tell you information about items, for instance, how much gold a bag contained once you pick it up.

You can scroll through these messages in case you missed something.

#### The minimap

In the top right, you'll see a small version of the map, called a minimap. You can look at this minimap to see all previously visited rooms. It will also show the passages connected to each room, which is useful if you missed going through one.

The minimap will automatically center the to the room that you're currently in, and will follow you as you move around. But, if you want to, you can pan the minimap by dragging it (holding left click and moving the mouse around). You can also also zoom in and out of the minimap by using the mouse wheel.

If you do decide to pan or zoom in on the minimap, it will no longer follow you around. Don't worry, though - A small icon will appear in the bottom left of the minimap panel - clicking this icon will reset the zoom and panning of the minimap, and it will start following you again. Phew.

#### The player panel

Lastly, in the bottom right, you'll see player information panel. This panel is split into 3 smaller panels:

1. The stats panel

The stats panel will display your stats, your bonus stats, and your character.

2. The inventory panel

This panel will display all of the items that you have collected on your journey. Like mentioned earlier, you can click on an item to consume or equip it. Hovering over an item will display information about it.

3. The equips panel

If you do have any weapons or armor equipped, it will appear here. Again, you can hover over an equipped item to view more information about it. If you don't want to use an item, you can click an item here to unequip it.

### Goal

There are two main goals for you in the maze game:

1. Find the exit by running through the maze.
2. Collect as much gold while doing so.

The exit isn't always easy to find, but you'll know it's the exit when you find a ladder. The dialogue box will help here too. However, if you think you can get more gold before exiting the maze, you can leave the room. Gold can be found in rooms, or enemies can drop some. It might be best to leave though, if you're on low health and have no armor.

If you do end up being slain by an enemy, you will lose the game. A message will appear on screen telling you what killed you, and a button will appear to start a new game (so you can take revenge).
