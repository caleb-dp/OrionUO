'use strict';
/*
PoisEngage
SwitchWeapon
UseGoldenMedailon*/

//Globals readonly
var color_pureWhite = 0x0B1D;
var color_red = 0x0021;
var color_green = 0x0044;


var color_error = 0x0021;
var color_warning = 0x0842;
var color_ok = 0x0044;
var color_info = 0x0127;


var graphic_kad = 0x1843;
var itemType_emptyPotion = { Graphic: 0x0F0E, Color: 0x0000 };
var charactersVisibleDistance = 22;



function PlayerBackpack() {
  return Orion.ObjAtLayer("Backpack").Serial();;
}


var potionDef =
  [
    { Name: "Mana Refresh", Shortcut: "MR", Qualities: [{ Quality: "None", MenuName: "Mana Refresh Potion", Graphic: 0x0F09, Color: 0x0005, KadColor: 0x0005 }] },
    { Name: "Agility", Shortcut: "Agility", Qualities: [{ Quality: "Greater", MenuName: "Greater Agility", Graphic: 0x0F08, Color: 0x0000, KadColor: 0x00BD }] },
    { Name: "Cure", Shortcut: "Cure", Qualities: [{ Quality: "Greater", MenuName: "Greater Cure", Graphic: 0x0F07, Color: 0x0000, KadColor: 0x0842 }] },
    { Name: "Heal", Shortcut: "Heal", Qualities: [{ Quality: "Greater", MenuName: "Greater Heal", Graphic: 0x0F0C, Color: 0x0000, KadColor: 0x08A7 }] },
    { Name: "Nightsight", Shortcut: "NS", Qualities: [{ Quality: "None", MenuName: "Nightsight", Graphic: 0x0F06, Color: 0x0000, KadColor: 0x03C4 }] },
    { Name: "Refresh", Shortcut: "Refresh", Qualities: [{ Quality: "Total", MenuName: "Total Refresh", Graphic: 0x0F0B, Color: 0x0000, KadColor: 0x014D }] },
    { Name: "Strength", Shortcut: "Strength", Qualities: [{ Quality: "Greater", MenuName: "Greater Strength", Graphic: 0x0F09, Color: 0x0000, KadColor: 0x0481 }] },
    { Name: "Invisibility", Shortcut: "Invis", Qualities: [{ Quality: "None", MenuName: "Invisibility", Graphic: 0x0F09, Color: 0x0B77, KadColor: 0x0B77 }] },
    { Name: "Total Mana Refresh", Shortcut: "TMR", Qualities: [{ Quality: "None", MenuName: "Total Mana Refresh", Graphic: 0x0F09, Color: 0x0003, KadColor: 0x0003 }] },
    { Name: "Blood", Shortcut: "Blood", Qualities: [{ Quality: "Greater", MenuName: "", Graphic: 0x0F0C, Color: 0x0025, KadColor: 0x0025 }] },
    { Name: "Lava Bomb", Shortcut: "Lava", Qualities: [{ Quality: "None", MenuName: "Lava Bomb", Graphic: 0x0F0D, Color: 0x000E, KadColor: 0x000E }] },
    { Name: "Hallucination", Shortcut: "Hallu", Qualities: [{ Quality: "None", MenuName: "Hallucination", Graphic: 0x0F06, Color: 0x0B90, KadColor: 0x0B90 }] },
    { Name: "Shrink", Shortcut: "Shrink", Qualities: [{ Quality: "None", MenuName: "Shrink", Graphic: 0x0F09, Color: 0x045E, KadColor: 0x0724 }] }

  ];
//Globals readonly

//---------------------------------------------------------------------------------------------
//opravi staty a vrati veci na sebe
function OpravStaty() {
  var currentEq = [];

  if (Orion.ObjAtLayer("Arms") != null) currentEq.push(Orion.ObjAtLayer("Arms"));
  if (Orion.ObjAtLayer("Helmet") != null) currentEq.push(Orion.ObjAtLayer("Helmet"));
  if (Orion.ObjAtLayer("Gloves") != null) currentEq.push(Orion.ObjAtLayer("Gloves"));
  if (Orion.ObjAtLayer("MidTorso") != null) currentEq.push(Orion.ObjAtLayer("MidTorso"));
  if (Orion.ObjAtLayer("InnerTorso") != null) currentEq.push(Orion.ObjAtLayer("InnerTorso"));
  if (Orion.ObjAtLayer("Pants") != null) currentEq.push(Orion.ObjAtLayer("Pants"));
  if (Orion.ObjAtLayer("Shoes") != null) currentEq.push(Orion.ObjAtLayer("Shoes"));
  if (Orion.ObjAtLayer("Shirt") != null) currentEq.push(Orion.ObjAtLayer("Shirt"));
  if (Orion.ObjAtLayer("Necklace") != null) currentEq.push(Orion.ObjAtLayer("Necklace"));
  if (Orion.ObjAtLayer("Waist") != null) currentEq.push(Orion.ObjAtLayer("Waist"));
  if (Orion.ObjAtLayer("Robe") != null) currentEq.push(Orion.ObjAtLayer("Robe"));
  if (Orion.ObjAtLayer("LeftHand") != null) currentEq.push(Orion.ObjAtLayer("LeftHand"));
  if (Orion.ObjAtLayer("RightHand") != null) currentEq.push(Orion.ObjAtLayer("RightHand"));


  Orion.CancelWaitGump();
  Orion.CancelWaitMenu();


  var type = null;
  if (Orion.Count(0x22C5, 0x0000) > 0) { //cestovka
    type = { Graphic: 0x22C5, Color: 0x0000 };
  } else if (Orion.Count(0x0FEF, 0x0482) > 0) {  //travel book
    type = { Graphic: 0x0FEF, Color: 0x0482 };
  }

  if (type == null) {
    Orion.CharPrint(Player.Serial(), color_warning, "[ nemas knihu ]");
    return;
  }

  var g = Orion.CreateGumpHook(2);
  g.AddCheck(2, true);
  Orion.WaitGump(g);
  Orion.WaitMenu("Po pouziti vam budou opraveny staty na spravne hodnoty. Pozor, pri oprave vam spadne vase brneni do batuzku!", "Ano, oprav");
  Orion.UseType(type.Graphic, type.Color);

  Orion.Wait(250);

  Orion.Print("currentEq: " + currentEq.length);

  for (var i = 0; i < currentEq.length; i++) {
    var curr = currentEq[i];
    if (curr.Container() == Orion.ObjAtLayer("Backpack").Serial()) {
      Orion.UseObject(curr.Serial());
      Orion.Wait(200);
    }
  }

  Orion.Wait(250);
  Orion.CancelTarget();
}

//---------------------------------------------------------------------------------------------
//utok na zvolene targety zleva do prava nebo nalezeny nejblizsi enemy
function AttackTarget(targets) {
  EnsureWarMode();

  var target = ParseTargets(targets);
  var enemy = null;
  if (target.Success && target.Object != null) {
    enemy = target.Object;
  } else {
    SelectNextTargetEnemy(800);
    enemy = Orion.FindObject(ClientLastEnemy());
  }

  if (enemy != null) {
    PrintCharacterHitsOver(enemy.Serial());
    Orion.Attack(target.Serial);
  }

}

//---------------------------------------------------------------------------------------------

function EquipSlotWeapon(nameKey, graphic, color, ensureShield) {

  if (graphic === undefined) graphic = 0xFFFF;
  if (color === undefined) color = 0xFFFF;
  if (ensureShield === undefined) ensureShield = true;

  var slotItem = null;//Orion.FindObject(Orion.GetGlobal("EquipSlotWeapon_" + nameKey));

  if (slotItem == null) {
    var found = ToObjectList(Orion.Split(Orion.FindType(graphic, color, "self"), ","));
    if (found.length > 0) {
      slotItem = found[0];
    }
  }

  if (slotItem != null) {
    Orion.SetGlobal("EquipSlotWeapon_" + nameKey, slotItem.Serial());

    if (slotItem.Layer() != 1 && slotItem.Layer() != 2) {


      var c = color_info;// color && color > 0  ? color : color_info;
      Orion.CharPrint(Player.Serial(), c, "[ " + nameKey + " ]");
      Orion.UseObject(slotItem.Serial());
      Orion.Wait(100);
      Orion.CancelTarget();
    }

    if (ensureShield) {
      var lastShield = Orion.FindObject(Orion.GetGlobal("SwitchShield_Last"));
      if (lastShield != null) {
        if (lastShield.Layer() != 1 && lastShield.Layer() != 2) {
          Orion.UseObject(lastShield.Serial());
        }
      }
      else {
        SwitchShield();
      }
    }
  }
  else {
    Orion.CharPrint(Player.Serial(), color_warning, "[ nemas " + nameKey + " ]");
  }
}

//---------------------------------------------------------------------------------------------
//prepina stity, nebere ty ze zakazaneho listu
function SwitchShield() {

  if (HasEquipedDenyItem()) return;

  var shields = SortObjectBySerialAsc(ToObjectList(Orion.FindList("shields", "backpack")));
  var shieldsDeny = ToObjectList(Orion.FindList("equipDenyItems", "self"));
  var lastShield = Orion.GetGlobal("SwitchShield_Last");

  var finalShields = [];
  Orion.Print("shields: " + shields.length);
  for (var i = 0; i < shields.length; i++) {
    var s = shields[i];
    var deny = false;
    for (var d = 0; d < shieldsDeny.length; d++) {
      var sd = shieldsDeny[d];
      if (s.Serial() == sd.Serial()) {
        deny = true;
        break;
      }
    }

    if ((s.Serial() == lastShield && s.Container() != Orion.ObjAtLayer("Backpack").Serial()) || s.Layer() == 1 || s.Layer() == 2 || s.Container() != Orion.ObjAtLayer("Backpack").Serial()) {
      deny = true;
    }


    if (!deny) {
      finalShields.push(s);
    }
  }

  for (var i = 0; i < finalShields.length; i++) {
    Orion.SetGlobal("SwitchShield_Last", finalShields[i].Serial());
    Orion.UseObject(finalShields[i].Serial());
    break;
  }

}



//---------------------------------------------------------------------------------------------
//vraci true pokud mate nasazen jeden z itemy v listu equipDenyItems, napr mystik pal, mag hul... atd
function HasEquipedDenyItem() {
  var deny = ToObjectList(Orion.FindList("equipDenyItems", "self"));
  for (var i = 0; i < deny.length; i++) {
    var d = deny[i];
    if (d.Layer() == 1 || d.Layer() == 2) {
      Orion.CharPrint(Player.Serial(), color_warning, "[ deny item ]");
      return true;
    }
  }

  return false;
}

//---------------------------------------------------------------------------------------------
//vendeta s nabijenim
function EquipVendeta() {
  var itmCharged = ToObjectList(Orion.Split(Orion.FindType(0x27AB, 0x0B4F, "self"), ","));
  var itm = ToObjectList(Orion.Split(Orion.FindType(0x27AB, 0x0B2D, "self"), ","));
  var deadlyKad = ToObjectList(Orion.Split(Orion.FindType(0x1843, 0x08A2, "self"), ","));


  if (itmCharged.length > 0) {
    if (itmCharged[0].Layer() == "" || itmCharged[0].Layer() == 0)
      UseTypeCust(itmCharged[0].Graphic(), itmCharged[0].Color(), ["none"], "", "[ vendeta ]");
    else
      Orion.CharPrint(Player.Serial(), color_info, "[ vendeta ]");

    return;
  }

  if (itm.length == 0) {
    Orion.CharPrint(Player.Serial(), color_warning, "[ nemas vendetu ]");
    return;
  }

  if (deadlyKad == 0) {
    Orion.CharPrint(Player.Serial(), color_warning, "[ nemas deadly ]");
    return;
  }

  Orion.CharPrint(Player.Serial(), color_info, "[ vendeta ]");
  Orion.WaitTargetObject(deadlyKad[0].Serial());
  Orion.UseObject(itm[0].Serial());
}

//---------------------------------------------------------------------------------------------
//rozsireny usetype ;]     
function UseTypeCust(gra, c, targets, targetText, playerText, targetTextColor, playerTextColor, targetTypeStrict) {

  if (gra === undefined) gra = 0xFFFF;
  if (c === undefined) c = 0xFFFF;
  if (targets === undefined) targets = [];
  if (targetText === undefined) targetText = "";
  if (playerText === undefined) playerText = "";
  if (targetTextColor === undefined) targetTextColor = color_info;
  if (playerTextColor === undefined) playerTextColor = color_info;
  if (targetTypeStrict === undefined) targetTypeStrict = "Any";

  var types = ToObjectList(Orion.Split(Orion.FindType(gra, c, "self"), ","));

  if (types.length > 0) {

    var t = null;
    var none = false;

    if (playerText != "") {
      Orion.CharPrint(Player.Serial(), playerTextColor, playerText);
    }

    var tSuccess = false;

    if (targets.length > 0 && targets[0] == "none") {
      none = true;
      tSuccess = true;
    } else {

      t = GetTarget(targets);

      if (t.Success) {
        if (t.Object != null) {
          if (targetText != "") {
            Orion.CharPrint(t.Object.Serial(), targetTextColor, targetText);
          }
          Orion.WaitTargetObject(t.Object.Serial());
          tSuccess = true;
        } else if (t.IsStatic && targetTypeStrict != "Object") {
          Orion.WaitTargetTile(t.Graphic, t.X, t.Y, t.Z);
          tSuccess = true;
        }
      }
    }

    if (tSuccess) {
      Orion.UseObject(types[0].Serial());

      if (none) {
        Orion.Wait(100);
        Orion.CancelTarget();
      }
    }
  } else {

    Orion.CharPrint(Player.Serial(), color_warning, "[ nemas" + (playerText === "" ? " typ" : String_ReplaceChar(String_ReplaceChar(playerText, "[", ""), "]", "")) + "]");

  }

}

//---------------------------------------------------------------------------------------------

//Non-Exec
//potionName - datovy typ string, presny nazev potionu v potionDef. napr. "Total Mana Refresh"
//vrati nalezenou definici nebo null
function FindPotionDef(potionName) {
  var potion = null;
  for (var i = 0; i < potionDef.length; i++) {

    var pdef = potionDef[i];
    if (pdef.Name == potionName) {
      potion = pdef;
      break;
    }
  }
  return potion;

}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vrati true pokud ma hrac v bacpacku alespon 1 prazdnou lahev
function HasEmptyPotion() {
  return Orion.Count(itemType_emptyPotion.Graphic) > 0;

}

//---------------------------------------------------------------------------------------------

//Non-Exec
//potionQuality - datovy typ PotionQuality, kvalita od potionDef
//vrati true pokud 
function HasKad(potionQuality) {
  return Orion.Count(graphic_kad, potionQuality.KadColor) > 0;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//potionQuality - datovy typ PotionQuality, kvalita od potionDef       
//vrati true pokud ma hrac v bacpacku alespon 1 lahev prislishe kvality
function HasPotion(potionQuality) {
  return Orion.Count(potionQuality.Graphic, potionQuality.Color) > 0;
}



//---------------------------------------------------------------------------------------------  

//Non-Exec
//potionQuality - datovy typ PotionQuality, kvalita od potionDef       
//naplni lahve z kade a vrati string OK pokud probehlo uspesne, pripadne Error_XYZ
function FillPotionFromKad(potionQuality) {
  if (!HasKad(potionQuality)) {
    Orion.Print("Nemas kad");
    return "Error_Kad";
  }
  if (!HasEmptyPotion()) {
    Orion.Print("Nemas prazdne lahve");
    return "Error_Empty";
  }
  //Pri praci s nadobou nemuzes delat neco jineho

  Orion.ClearJournal();
  Orion.WaitTargetType(itemType_emptyPotion.Graphic);
  Orion.UseType(graphic_kad, potionQuality.KadColor);
  Orion.Wait(250);

  if (Orion.InJournal("Pri praci s nadobou nemuzes delat neco")) {
    return "Error_InUse";
  }

  return "OK";
}

//---------------------------------------------------------------------------------------------

//Executable
//potionName - datovy typ string, presny nazev potionu v potionDef. napr. "Total Mana Refresh"
//vypije prislusnou lahev v kvalite kterou nalezne jako prvni, pripadne si nalije z kade. Pri znovuzmacknuti prelije lahev
//Hotkey - External Code >>> DrinkPotion("Total Mana Refresh");
function DrinkPotion(potionName) {

  var potion = FindPotionDef(potionName);

  if (potion != null) {

    var foundKades = [];
    var drinkSuccess = false;
    var cantDrink = false;

    for (var q = 0; q < potion.Qualities.length; q++) {
      var quality = potion.Qualities[q];
      var c = Orion.Count(quality.Graphic, quality.Color);

      if (HasKad(quality)) {
        foundKades.push({ Potion: potion, Quality: quality });
      }

      if (c > 0) {
        Orion.ClearJournal();
        Orion.UseType(quality.Graphic, quality.Color);
        Orion.Wait(250);
        if (Orion.InJournal("You put the empty bottless")) {
          cantDrink = true;
          Orion.CharPrint(Player.Serial(), quality.KadColor, "[ " + potion.Shortcut + " " + Orion.Count(quality.Graphic, quality.Color) + " ]");
          drinkSuccess = true;
        }
        break;
      } else {
        Orion.Print("Nemas " + potionName);
      }
    }

    if (!drinkSuccess && foundKades.length > 0 && HasEmptyPotion()) {

      var fk = foundKades[0];
      var fillResult = FillPotionFromKad(fk.Quality);
      //todo optional prepnuti waru pokud 0 jina

      var c = Orion.Count(fk.Quality.Graphic, fk.Quality.Color);

      if (c > 0 && !cantDrink) {
        Orion.ClearJournal();
        Orion.UseType(quality.Graphic, quality.Color);
        Orion.Wait(250);
      }

      Orion.CharPrint(Player.Serial(), quality.KadColor, "[ " + potion.Shortcut + " " + Orion.Count(fk.Quality.Graphic, fk.Quality.Color) + " ]");
    }

  } else {
    Orion.Print("Potion " + potionName + " neexistuje.");
  }
}


//---------------------------------------------------------------------------------------------

//Executable
//targets - datovy typ pole stringu, pole zleva do prava vyhodnocujicich se aliasu targetu. napr ["lasttarget", "lastttack"], nebo [] pro tercik
//pouzije existujici nebo vynda z kade lavabomu v rezimu zniceni zdi nebo zniceni summona.
//Hotkey - External Code >>> UsumonLavaBomb([]);
function UsumonLavaBomb(targets) {


  var lavaObj = null;
  var lavaDef = FindPotionDef("Lava Bomb");
  var bpk = PlayerBackpack();
  var lavaQ = lavaDef.Qualities[0];

  if (HasPotion(lavaQ)) {//lavas != "") {
    var lavas = FindTypeObjRecursive(lavaQ.Graphic, lavaQ.Color);
    if (lavas.length > 0) {
      lavaObj = lavas[0];
    }
  }
  else if (FillPotionFromKad(lavaQ) == "OK") {
    var lavas = FindTypeObjRecursive(lavaQ.Graphic, lavaQ.Color);
    if (lavas.length > 0) {
      lavaObj = lavas[0];
    }
  }


  if (lavaObj != null) {
    Orion.DropHere(lavaObj.Serial());
    Orion.Wait(200);
    Orion.MoveItem(lavaObj.Serial(), 1, 'ground', lavaObj.X() + 1, lavaObj.Y() + 1, lavaObj.Z());
    Orion.Wait(200);
    Orion.MoveItem(lavaObj.Serial(), 1, lavaObj.X() + 1, lavaObj.Y() + 1, lavaObj.Z());
    Orion.Wait(200);
    Orion.CharPrint(Player.Serial(), lavaQ.KadColor, "[ Unsumon lava ]");

    TryWaitTargetObject(targets);
    Orion.UseObject(lavaObj.Serial());
  }
  else {
    Orion.Print("Nemas Lava bombu");
  }

}

//Potiony

//---------------------------------------------------------------------------------------------

//shrinkuje pety po jednom v okoli do 2 policek, vyber je serazen dle HP vzestupne a zapamatuje si spatne moby (summy). Pokud je to Leopard apod tak je bere zezeme
function ShrinkPet(defaultLevels) {

  var shrinkKad = FindTypeObjRecursive(0x1843, 0x0724);
  var mobs = SortObjectByHitsAsc(GetCurrentMobs(2));
  var deny = Orion.GetGlobal("ShrinkPet_Deny");
  Orion.Print("ShrinkPet " + mobs.length);

  if (shrinkKad.length == 0) {
    Orion.CharPrint(Player.Serial(), color_warning, "[ nemas shrink ]");
    return;
  }

  var mob = null;
  for (var i = 0; i < mobs.length; i++) {
    mob = mobs[i];
    var key = mob.Serial() + "_" + mob.MaxHits();
    if (Orion.Contains(deny, key)) continue;

    Orion.ClearJournal();
    Orion.WaitTargetObject(mob.Serial());
    Orion.UseObject(shrinkKad[0].Serial());
    Orion.Wait(150);

    if (Orion.InJournal("Ale co to delas?")) {
      if (deny == "") {
        deny = key;
      } else {
        deny = deny + "," + key;
      }
      Orion.CharPrint(mob.Serial(), color_warning, "[ deny ]");
    }
    break;
  }

  if (defaultLevels) {

    for (var i = 0; i < defaultLevels.length; i++) {
      var groundState = Orion.FindList(String_ToLower(String_ReplaceChar(defaultLevels[i], " ", "")), ground, "item", 2);

      for (var s = 0; s < groundState.length; s++) {
        Orion.MoveItem(groundState[s], 1);
        break;
      }

      if (groundState.length > 0) {
        break;
      }
    }
  }

  Orion.SetGlobal("ShrinkPet_Deny", deny);
}

//---------------------------------------------------------------------------------------------

//vyhodi klamaka vybraneho levelu nebo vychozi, pripadne prvni nalezeny level. pokud UseAim = true tak vyhodi tercik a klamaka vyhodi na dane misto
function UsePetLevelOrDefault(defaultLevels, useAim) {
  if (useAim === undefined) useAim = false;

  var levels = [Orion.GetGlobal("PetMaster.PetLevel")];
  levels.push(defaultLevels);

  var selList = [];
  var sel = "";

  for (var i = 0; i < levels.length; i++) {
    selList = FindListObjRecursive(String_ToLower(String_ReplaceChar(levels[i], " ", "")));
    if (selList.length > 0) {
      sel = levels[i];
      break;
    }
  }

  if (selList.length > 0) {

    Orion.CharPrint(Player.Serial(), color_pureWhite, "" + sel + " (" + selList.length + ")");

    if (useAim) {
      var target = GetTarget();

      Orion.Print("target Success " + target.Success);

      if (target.Success) {


        Orion.MoveItem(selList[0].Serial(), 1, "ground", target.X, target.Y, target.Z);
        Orion.Wait(250);
      }
    }
    SwitchWarModeOn();
    Orion.Wait(100);
    Orion.UseObject(selList[0].Serial());

  } else {
    Orion.CharPrint(Player.Serial(), color_warning, "[ nemas pety ]");
  }
}


//---------------------------------------------------------------------------------------------  

//vybere vzdy dalsi pet level ze vstupniho parametru pokud mate u sebe aspon 1 ks 
function SelectNextPetLevel(petLevels) {
  var finalLevels = [];
  for (var i = petLevels.length - 1; i >= 0; i--) {
    var pl = String_ToLower(String_ReplaceChar(petLevels[i], " ", ""));
    if (Orion.FindList(pl).length > 0) {
      finalLevels.push(petLevels[i]);
      //Orion.Print("pl " + pl + " / "  + Orion.FindList(pl).length);
    }
  }

  var sel = SelectNextGetGlobal(finalLevels, "PetMaster.PetLevel");

  if (sel) {
    var findList = FindListObjRecursive(String_ToLower(String_ReplaceChar(sel, " ", "")));
    Orion.CharPrint(Player.Serial(), color_pureWhite, "" + sel + " (" + findList.length + ")");
  } else {
    Orion.CharPrint(Player.Serial(), color_warning, "[ nemas pety ]");
  }

}


//---------------------------------------------------------------------------------------------

//Vypne zapne guild runu
function GuildRune() {

  var groundState = SortObjectByDistanceAsc(ToObjectList(Orion.FindType("0x0E62", "0xFFFF", ground, "item", 2)));

  if (groundState.length > 0) {
    var rune = groundState[0];
    if (rune.Color() == 0x0481) {
      Orion.CharPrint(rune.Serial(), color_info, "[ Off ]");
    } else {
      Orion.CharPrint(rune.Serial(), color_info, "[ On ]");
    }

    Orion.UseObject(rune.Serial());
  }

  Orion.Print("groundState " + groundState.length);
}

//---------------------------------------------------------------------------------------------

//otevre dvere devinovane v listu nebu v ostatnich aktivnich napr kliky
function OpenDoor() {

  var groundState = SortObjectByDistanceAsc(ToObjectList(Orion.FindList("openDoors|closeDoors|otherActive", ground, "item", 2)));
  //Orion.Print("groundState " + groundState.length);

  for (var i = 0; i < groundState.length; i++) {
    Orion.UseObject(groundState[i].Serial());
    Orion.CharPrint(groundState[i].Serial(), color_info, "[ use ]");
    break;
  }
}

//---------------------------------------------------------------------------------------------

//Healing


//sni salat pokud je to nutne ;]
function SnezSalat() {

  var salat = GetFindObject(Orion.FindType(0x09EC, 0x06AB));
  if (salat == null) {
    Orion.CharPrint(Player.Serial(), color_warning, "[ neni salat ]");
    return;
  }

  var dmg = Player.MaxHits() - Player.Hits();
  var hasInjury = dmg > 0;

  if (dmg > 30 || hasInjury && Player.Hits() < 60) {
    var startHits = Player.Hits();
    Orion.UseObject(salat.Serial());
    Orion.Wait(250);
    var endHits = Player.Hits();
    Orion.CharPrint(Player.Serial(), GetPrintAlieColorByHits(Player.Serial()), "[ salat +" + (endHits - startHits) + " ]");
  } else {
    Orion.CharPrint(Player.Serial(), color_ok, "[ nemusis salat ]");
  }
}


//---------------------------------------------------------------------------------------------

//using UseMount.js
var darkSkull = { Graphic: 0x1F0B, Color: 0x0485 };

function UseDarkSkull() {

  var skull = Orion.FindObject(Orion.FindType(darkSkull.Graphic, darkSkull.Color, "self"));
  var hat = Orion.ObjAtLayer("Helmet");
  var mount = Orion.ObjAtLayer("Mount");
  var hits = Player.Hits();
  var manaDiff = Player.MaxMana() - Player.Mana();

  if (skull == null) {
    Orion.CharPrint(Player.Serial(), color_error, "[ nemas mystik ]");
    return;
  }

  if (hits < 50) {
    Orion.CharPrint(Player.Serial(), color_error, "[ malo HP ]");
    return;
  }

  if (manaDiff < 10) {
    Orion.CharPrint(Player.Serial(), color_warning, "[ full mana ]");
    return;
  }

  if (skull.Layer() == 6) {
    Orion.MoveItem(skull.Serial(), 1, PlayerBackpack());
    Orion.Wait(150);
  }

  var dismount = (mount != null);
  var dismountFailed = false;

  if (dismount) {
    UseMount();
    Orion.Wait(150);
    dismount = true;
    dismountFailed = Orion.ObjAtLayer("Mount") != null;
  }

  if (dismountFailed) {
    Orion.CharPrint(Player.Serial(), color_error, "[ dismount failed ]");
    return;
  }

  Orion.UseObject(skull.Serial());
  Orion.Wait(150);

  if (dismount) {
    UseMount();
    Orion.Wait(150);
  }

  if (hat != null && hat.Serial() != skull.Serial()) {
    Orion.UseObject(hat.Serial());
  }

}
//Healing

//---------------------------------------------------------------------------------------------

//Non-Exec
//najde a vrati nejblizsiho mounta a nasedne na nej nebo null
function FindUseNearestMount() {

  var charList = SortObjectByDistanceAsc(GetCurrentMobs(6));
  var lastTry = Orion.GetGlobal("UseMount_LastTry");
  var index = 0;
  var mount = null;

  if (charList.length > 0) {
    if (lastTry != "") {
      for (var i = 0; i < charList.length; i++) {
        var ch = charList[i];

        if (lastTry == ch.Serial() && i < charList.length - 1) {
          index = i + 1;
          break;
        }
      }
    }

    var mountTry = charList[index];
    var mountTrySerial = mountTry.Serial();
    Orion.CharPrint(mountTry.Serial(), color_pureWhite, "[ try ]");
    Orion.UseObject(mountTry.Serial());
    Orion.Wait(150);
    Orion.SetGlobal("UseMount_LastTry", mountTrySerial);
    if (Orion.ObjAtLayer("Mount") != null) {
      mount = mountTry;
      Orion.SetGlobal("UseMount_Mount", mountTrySerial);
      Orion.SetGlobal("UseMount_LastTry", "");
    }
  }



  return mount;

}

//--------------------------------------------------------------------------------------------- 
//Executable
//sedne z mouta nebo najde mounta v okoli do 6 policek, zkousi vsechny moby postupne kvuly halucinacim, uspesne nasednuti ulozi i po sesednuti. Pokud neni hleda shrink zvirata z listu shrinkMounts a pak odshrink a nasedne
//Hotkey - External Code >>> UseMount();
function UseMount() {

  var mountSerial = Orion.GetGlobal("UseMount_Mount");
  var mount = GetFindObject(mountSerial);
  //Orion.Print("mount " +mount);
  var currMount = Orion.ObjAtLayer("Mount");
  var dismount = false;
  var charListOrig = GetCharacterList(6);
  if (currMount != null) dismount = true;

  if (dismount) {
    Orion.UseObject(Player.Serial());
    Orion.Wait(250);
    var charListCurrent = GetCharacterList(6);
    var diff = SortObjectByDistanceAsc(GetObjectArrayDiff(charListCurrent, charListOrig));
    mount = GetFindObject(mountSerial);
    if (mount == null || Orion.GetDistance(mount) > charactersVisibleDistance) {

      for (var i = 0; i < diff.length; i++) {
        var o = diff[i];
        if (o.CanChangeName(o.Serial())) {
          mount = o;
          Orion.SetGlobal("UseMount_Mount", mount.Serial());
          break;
        }
      }
    }

  } else {

    if (mount != null) {
      Orion.CharPrint(mount.Serial(), color_pureWhite, "[ mount " + Orion.GetDistance(mount.Serial()) + "]");
      Orion.UseObject(mount.Serial());
    } else {

      mount = FindUseNearestMount();
    }
  }
  if (mount == null && !dismount) {

    var shrinkMounts = FindListObjRecursive("shrinkMounts", PlayerBackpack()); // Orion.FindList("shrinkMounts");
    //Orion.Print("shrinkMounts " + shrinkMounts.length);
    if (shrinkMounts.length > 0) {
      Orion.Print("shrinkMounts " + shrinkMounts.length);
      Orion.UseObject(shrinkMounts[0].Serial());
      Orion.Wait(150);
      mount = FindUseNearestMount();
    }
  }

  if (mount == null) {
    Orion.CharPrint(Player.Serial(), color_pureWhite, "[ neni mount ]");
  }

}

//---------------------------------------------------------------------------------------------

//Executable
//hidne s odpocitavanim
//printStep - datovy typ int, velikost odpocivaciho casu v ms.
//alertTime - datovy typ int, hranic po ktere zacne vypisovat cervene odpocitavani
//Hotkey - External Code >>> HidePlayer(250, 1500);
function HidePlayer(printStep, alertTime) {
  if (printStep == undefined) printStep = 200;
  if (alertTime == undefined) alertTime = 1400;

  var ping = 100;
  var hidStepMs = 50;

  var characterColor = Orion.GetCharactersFontColorValue();
  var green = color_green;
  var red = color_red;

  Orion.Print("Start Hidding");
  if (Orion.ObjAtLayer('LeftHand')) {
    var lanternGraphic = Orion.ObjAtLayer('LeftHand').Graphic();
    if (lanternGraphic == 0x0A15) {
      Orion.Unequip('LeftHand');
    }
  }
  Orion.ClearJournal();
  Orion.Wait(ping);
  Orion.UseSkill('Hiding');
  Orion.Wait(150 + ping);
  if (Orion.InJournal('You are preoccupied with')) {
    SwitchWarModeOn();

    Orion.ClearJournal();
    Orion.UseSkill('Hiding');
  }
  var ms = 0;
  //Todo battle

  var sychr = 0;

  while (!(Orion.InJournal('You have hidden yourself well') || Orion.InJournal('t seem to hide here'))) {
    ms = ms + hidStepMs;
    sychr = sychr + hidStepMs;

    if (ms % printStep == 0) {

      var stepColor = characterColor;
      if (ms >= alertTime) {
        stepColor = red;
      }

      Orion.CharPrint(Player.Serial(), stepColor, ms / 1000);
    }
    Orion.Wait(hidStepMs);
  }

  if (Orion.InJournal('You have hidden yourself well')) {
    Orion.CharPrint(Player.Serial(), green, '[ Hidden ]');
  }
  if (Orion.InJournal('t seem to hide here')) {
    Orion.CharPrint(Player.Serial(), red, '[ FAILED ]');
  }
}

//--------------------------------------------------------------------------------------------- 

function GetChargesCount(obj) {
  var count = 0;

  if (obj != null) {
    var name = obj.Name();
    if (name == "") {
      Orion.Click(obj.Serial());
      Orion.Wait(100);
      name = obj.Name();
    }

    if (name != "") {
      var split = Orion.Split(name, "(");
      if (split.length > 1) {
        split = Orion.Split(split[1], " ");
        if (split.length > 0) {
          count += (split[0] | 0);
        }
      }
    }
  }

  //Orion.Print("GetChargesCount " + name + " " + count);

  return count;
}

//--------------------------------------------------------------------------------------------- 

var rr = { Graphic: 0x108A, Color: 0x0496 };
var grr = { Graphic: 0x108A, Color: 0x0B21 };
var grr2 = { Graphic: 0x108A, Color: 0x0B98 };
var hodf = { Graphic: 0x136C, Color: 0x0B89 };
var ggr = { Graphic: 0x108A, Color: 0x0000 };

//Executable
//pouzije sperk dane grafiky a bravy, toci ruzna ID a vraci na puvodni misto a i puvodni item zas oblekne
//title - datovy typ string, idealne zkratka sperku
//graphic - datovy typ grafika 
//color - datovy typ color 
//layer - layer sperku
function UseJewlery(title, graphic, color, layer) {

  var items = SortObjectBySerialAsc(FindTypeObjRecursive(graphic, color));
  var origItem = layer != undefined && layer != "" && layer != "none" ? Orion.ObjAtLayer(layer) : null;
  var outOfChargesStr = Orion.GetGlobal("UseJewlery_OutOf" + graphic + "|" + color);
  var outOfChargesArr = Orion.Split(outOfChargesStr, ",");
  var lastItem = Orion.GetGlobal("UseJewlery_Last_" + graphic + "|" + color);

  var filtered = [];
  for (var i = 0; i < items.length; i++) {
    var found = false;
    var item = items[i];
    //	var chargesCount = GetChargesCount(items[i]);


    for (var u = 0; u < outOfChargesArr.length; u++) {
      if (item.Serial() == outOfChargesArr[u]) {
        found = true;
        break;
      }
    }

    if (!found) {
      if (GetChargesCount(items[i]) == 0) {
        outOfChargesArr.push(item.Serial());
        found = true;
        break;
      }
    }

    if (!found) {
      filtered.push(item);
    }
  }

  if (filtered.length > 0) {
    var index = 0;
    for (var i = 0; i < filtered.length; i++) {
      var item = filtered[i];
      if (item.Serial() == lastItem && i < filtered.length - 1) {
        index = i + 1;
        break;
      }
    }

    var selected = filtered[index];
    var origX = selected.X();
    var origY = selected.Y();

    Orion.ClearJournal();
    //Orion.UseObject(selected.Serial());
    Orion.Wait(250);
    if (Orion.InJournal("You must recharge it")) {
      outOfChargesArr.push(selected.Serial());
      Orion.CharPrint(Player.Serial(), color_pureWhite, "[ " + title + " outOf ]");
    }
    else if (Orion.InJournal("The item should be equipped to use|It too soon to use it again|You have to wait")) {
      var journalCount = Orion.JournalCount()

      for (var i = journalCount - 1; i >= 0; i--) {
        var line = Orion.JournalLine(i);

        if (String_StartWith(line.Text(), "You have to wait")) {

          var split = Orion.Split(line.Text(), " ");
          if (split.length > 1) {
            Orion.CharPrint(Player.Serial(), color_pureWhite, "[ " + title + " " + split[split.length - 2] + "s ]");
          }
          break;
        }

      }
    }



    if (selected.Container() != PlayerBackpack()) {
      Orion.MoveItem(selected.Serial(), count = 1, x = origX, y = origY);
    }
    if (origItem != null && origItem.Container() == PlayerBackpack()) {
      Orion.Wait(250);
      Orion.UseObject(origItem.Serial());
    }

  }

  Orion.SetGlobal("UseJewlery_OutOf" + graphic + "|" + color, Array_ToString(outOfChargesArr))

  Orion.Print(title + ": " + filtered.length + ", Out: " + outOfChargesArr.length);

}

//---------------------------------------------------------------------------------------------

//Executable
//toci GRR, GRR2 a RR meni typy a ID
function ReflexRing() {

  var itemsRR = SortObjectBySerialAsc(FindTypeObjRecursive(rr.Graphic, rr.Color));
  var itemsGRR = SortObjectBySerialAsc(FindTypeObjRecursive(grr.Graphic, grr.Color));
  var itemsGRR2 = SortObjectBySerialAsc(FindTypeObjRecursive(grr2.Graphic, grr2.Color));
  var itemsHodf = SortObjectBySerialAsc(FindTypeObjRecursive(hodf.Graphic, hodf.Color));

  var types = [];

  if (itemsGRR.length > 0) {
    types.push("GRR");
  }
  if (itemsGRR2.length > 0) {
    types.push("GRR2");
  }

  if (itemsRR.length > 0) {
    types.push("RR");
  }

  if (itemsHodf.length > 0) {
    types.push("HoDF");
  }

  //var usetType = "GRR";
  var lastUseType = Orion.GetGlobal("ReflexRing_LastType");

  if (types.length > 0) {
    var index = 0;
    for (var i = 0; i < types.length; i++) {
      var typ = types[i];
      if (typ == lastUseType && i < types.length - 1) {
        index = i + 1;
        break;
      }
    }

    var type = types[index];
    var usedType = null;
    var layer = "Ring";

    if (type == "GRR") {
      usedType = grr;
    } else if (type == "GRR2") {
      usedType = grr2;
    } else if (type == "HoDF") {
      usedType = hodf;
      layer = "none";
    } else {
      usedType = rr;
    }
    Orion.SetGlobal("ReflexRing_LastType", type);
    UseJewlery(type, usedType.Graphic, usedType.Color, layer);
  }
  else {
    Orion.CharPrint(Player.Serial(), color_pureWhite, "[ neni reflex ]");
  }
}

//---------------------------------------------------------------------------------------------

function GreatGoldRing() {
  UseJewlery("GGR", ggr.Graphic, ggr.Color, "Ring");
}

//CastingCust

//---------------------------------------------------------------------------------------------

//Executable
//hodi svetlo na sebe bud z lucerny, kade NS nebo kouzlo svetlo
//Hotkey - External Code >>> HodSvetloKad();
function HodSvetloKad() {

  var leftHand = Orion.ObjAtLayer("LeftHand");

  if (leftHand != null && leftHand.Graphic() == 0x0A15) {

    Orion.CharPrint(Player.Serial(), color_pureWhite, "[ Lucerna ]");
    Orion.WaitTargetObject(Player.Serial());
    Orion.UseObject(leftHand.Serial());

  }
  else if (Orion.Count(graphic_kad, 0x03C4) > 0) {

    Orion.CharPrint(Player.Serial(), color_pureWhite, "[ Nightsight ]");
    Orion.WaitTargetObject(Player.Serial());
    Orion.UseType(0x1843, 0x03C4);
  }
  else {

    Orion.WaitTargetObject(Player.Serial());
    Orion.Cast("Night Sight");
  }
}

//---------------------------------------------------------------------------------------------

//Executable
//vykouzli kouzlo, but nastavene vyberem SelectSpellNext, nebo defaultSpell na prislusny cil
//defaultSpell - datovy typ string, nazev vychoziho kouzla
//targets - datovy typ pole stringu, pole zleva do prava vyhodnocujicich se aliasu targetu. napr ["lasttarget", "lastttack"], nebo [] pro tercik
//Hotkey - External Code >>> CastSpellOrDefault("Harm", ["lastattack", "lasttarget"]);
function CastSpellOrDefault(defaultSpell, targets) {

  var selectedSpell = Orion.GetGlobal("Magery.SelectedSpell");

  if (!selectedSpell || selectedSpell.length <= 0) {
    selectedSpell = defaultSpell;
  }

  Orion.SetGlobal("Magery.SelectedSpell", selectedSpell);
  CastSpell(selectedSpell, targets);
}


//---------------------------------------------------------------------------------------------

//Non-Exec
//vraci cas  milisekundach dle magery na znovupouziti svitku
function GetScrollTimeout() {

  var skv = Orion.SkillValue("Magery");

  if (skv > 960)
    return 2000;
  else if (skv > 910)
    return 4000;
  else if (skv > 860)
    return 7000;
  else if (skv > 810)
    return 10000;
  else if (skv > 750)
    return 13000;
  else if (skv > 710)
    return 16000;
  else if (skv > 660)
    return 19000;
  else if (skv > 610)
    return 22000;
  else
    return 25000;
}

//---------------------------------------------------------------------------------------------

//Non-exec 
//vraci grafiku svitku daneho kouzla, vychozu 0
//spellName - datovy typ string, nazev kouzla
function GetSpellScroll(spellName) {
  spellName = String_ToLower(String_ReplaceChar(spellName, " ", ""));

  if (spellName === "wallofstone") return 0x1F44;
  if (spellName === "energyfield") return 0x1F5E;
  if (spellName === "teleport") return 0x1F42;
  if (spellName === "lighning") return 0x1F4A;
  if (spellName === "summoneartelemental") return 0x1F6A;
  if (spellName === "reflection") return 0x1F50;
  if (spellName === "paralyze") return 0x1F52;
  if (spellName === "protection") return 0x1F3B;
  if (spellName === "strength") return 0x1F3C;
  if (spellName === "dispel") return 0x1F55;
  if (spellName === "bladespirit") return 0x1F4D;
  if (spellName === "ressurection") return 0x1F67;
  if (spellName === "greaterheal") return 0x1F49;
  if (spellName === "heal") return 0x1F31;
  if (spellName === "flamestrike") return 0x1F5F;

  return 0;
}


//---------------------------------------------------------------------------------------------

//Executable
//vykouzli kouzlo na prislusny cil bud z hlavy nebo ze svitku pokud lze a je nastaveno
//spellName - datovy typ string, nazev  kouzla
//targets - datovy typ pole stringu, pole zleva do prava vyhodnocujicich se aliasu targetu. napr ["lasttarget", "lastttack"], nebo [] pro tercik
//Hotkey - External Code >>> CastSpell("Harm", ["lastattack", "lasttarget"], false);
function CastSpell(spellName, targets, useScroll) {
  EnsureWarMode();

  if (useScroll === undefined) useScroll = false;

  var canCastScroll = Orion.Timer("Magery.ScrollTimer") > GetScrollTimeout();
  var scrollGraphic = GetSpellScroll(spellName);
  var hasScroll = useScroll ? Orion.Count(scrollGraphic) > 0 : false;


  if (useScroll && canCastScroll && hasScroll) {

    Orion.ClearJournal();
    Orion.CharPrint(Player.Serial(), color_ok, "[ " + GetSpellShortcut(spellName) + " (" + Orion.Count(scrollGraphic) + ") ]");
    TryWaitTargetObject(targets);
    Orion.UseType(scrollGraphic);
    Orion.Wait(100);
    if (!Orion.InJournal("You can't cast another")) {

      if (Orion.TimerExists("Magery.ScrollTimer"))
        Orion.RemoveTimer("Magery.ScrollTimer");

      Orion.SetTimer("Magery.ScrollTimer");
      return;
    }
  }

  //   Orion.Print(spellName + " "   +  targets.length + " useScroll " + useScroll + " Time: " + Orion.Timer("Magery.ScrollTimer")  + " / "  +  scrollGraphic)	
  Orion.CharPrint(Player.Serial(), color_info, "[ " + GetSpellShortcut(spellName) + " ]");
  TryWaitTargetObject(targets);
  Orion.Cast(spellName);
  //Orion.Print("LastSpellIndex: " + Orion.GetGlobal("LastSpellIndex") + " / " + Orion.SkillValue("Magery") + " / " + GetScrollTimeout());
}

//---------------------------------------------------------------------------------------------

//Executable
//vykouzli summona na prislusny cil
//summonName - datovy typ string, jmeno sumona z menu
//targets - datovy typ pole stringu, pole zleva do prava vyhodnocujicich se aliasu targetu. napr ["lasttarget", "lastttack"], nebo [] pro tercik
//Hotkey - External Code >>> CastSummonCreature("Horse", ["self"], false); 
function CastSummonCreature(summonName, targets) {
  EnsureWarMode();

  Orion.CharPrint(Player.Serial(), color_pureWhite, "[ " + summonName + " ]");
  Orion.CancelWaitMenu();
  TryWaitTargetObject(targets);
  Orion.Cast("Summ. Creature");
  Orion.WaitMenu("What do you want to summon ?", summonName);
}

//---------------------------------------------------------------------------------------------

function CastSummonCreatureOrDefault(defaultSummon, targets) {

  var sel = Orion.GetGlobal("Magery.SelectedSummon");

  if (!sel || sel.length <= 0) {
    sel = defaultSummon;
  }

  Orion.SetGlobal("Magery.SelectedSummon", sel);

  CastSummonCreature(sel, targets);
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//spellName - datovy typ string, nazev  kouzla
//vrati zhraktu kouzla
function GetSpellShortcut(spellName) {

  var code = "";//String_ReplaceChar(spellName, " ", "");
  if (spellName && spellName.length > 5) {
    var split = Orion.Split(spellName, " ");
    if (split.length > 1) {
      for (var i = 0; i < split.length; i++) {
        for (var s = 0; s < split[i].length && s < 2; s++) {
          code += split[i][s];
        }
      }

    } else {
      var mid = (spellName.length / 2) | 0;
      code = spellName[0] + spellName[1] + spellName[mid] + spellName[spellName.length - 2] + spellName[spellName.length - 1];
    }
  } else {
    code = String_ReplaceChar(spellName, " ", "");
  }
  return code;

}

//---------------------------------------------------------------------------------------------
//Executable
//prepina kouzla a zvolene ulozi do globalni promene pro CastDefaultSpell
//spells - datovy typ pole stringu, kouzla ktere bude script prepinat napr. ["Harm", "Magic Arrow"]
//Hotkey - External Code >>> SelectSpellNext([ "Harm", "Magic Arrow", "Greater Heal" ]);  
function SelectSpellNext(spells) {

  var sel = SelectNextGetGlobal(spells, "Magery.SelectedSpell");
  Orion.CharPrint(Player.Serial(), GetSpellPrintColor(sel), "" + sel);

}

//---------------------------------------------------------------------------------------------

function SelectSummonNext(summons) {

  var sel = SelectNextGetGlobal(summons, "Magery.SelectedSummon");
  Orion.CharPrint(Player.Serial(), color_pureWhite, "" + sel);

}

//---------------------------------------------------------------------------------------------

//Non-Exec
//spellName - datovy typ string, nazev  kouzla
//vrati barvu kouzla 
function GetSpellPrintColor(spellName) {

  spellName = String_ReplaceChar(spellName, " ", "");

  if (spellName == "Teleport")
    return 0x0194;
  else if (spellName == "Dispel")
    return 0x0199;
  else if (spellName == "DispelField")
    return 0x019e;
  else if (spellName == "EnergyBolt")
    return 0x01a3;
  else if (spellName == "EnergyVortex")
    return 0x01a8;
  else if (spellName == "Harm")
    return 0x258;
  else if (spellName == "ChainLightning")
    return 0x01b2;
  else if (spellName == "Lightning")
    return 0x21;
  else if (spellName == "MagicArrow")
    return 0x01b7;
  else if (spellName == "MassCurse")
    return 0x01bc;
  else if (spellName == "MassDispel")
    return 0x01c6;
  else if (spellName == "NightSight")
    return 0x01cb;
  else if (spellName == "Paralyze")
    return 0x01d0;
  else if (spellName == "ParalyzeField")
    return 0x01d5;
  else if (spellName == "Reflection")
    return 0x01da;
  else if (spellName == "Ressurection")
    return 0x01df;
  else if (spellName == "Reveal")
    return 0x01e4;
  else if (spellName == "WallofStone")
    return 0x01e9;
  else if (spellName == "EnergyField")
    return 0x03e5;
  else if (spellName == "FlameStrike")
    return 0x30;

  return Orion.GetFontColorValue();
}

//CastingCust


//Targeting

//---------------------------------------------------------------------------------------------
//Non-Exec
//vrati instaci objektu target
function NewTarget() {

  var instance = {
    Success: false,
    Alias: '',
    Serial: 0,
    Object: null,
    X: -1,
    Y: -1,
    Z: -1,
    IsStatic: false,
    Graphic: 0,
    TargetsFrom: []
  };

  return instance;
}

//---------------------------------------------------------------------------------------------

function GetTarget(targets) {
  var target = NewTarget();
  if (targets) {
    target = ParseTargets(targets);
  }

  if (!target.Success) {

    var lastStaticX = SelectedTile.X();
    var lastStaticY = SelectedTile.Y();
    Orion.RemoveObject("GetTarget_Last");
    Orion.AddObject("GetTarget_Last");

    while (Orion.HaveTarget()) {
      Orion.Wait(25);


    }

    var obj = Orion.FindObject("GetTarget_Last");
    if (obj != null) {



      target.Success = true;
      target.Object = obj;
      target.Serial = obj.Serial();
      target.X = obj.X();
      target.Y = obj.Y();
      target.Z = obj.Z();
      //Orion.Print("target.X.X() " +target.X +  ". " + target.Y);

    } else // if (lastStaticX !=SelectedTile.X() && lastStaticY !=   SelectedTile.Y()) {
    {
      //Orion.Print("SelectedTile.X() " + SelectedTile.X() +  ". " + SelectedTile.Y());

      target.Success = true;
      target.X = SelectedTile.X();
      target.Y = SelectedTile.Y();
      target.Z = SelectedTile.Z();
      target.Graphic = SelectedTile.Graphic();
      target.IsStatic = true;
    }

  }
  return target;
}

//---------------------------------------------------------------------------------------------
//Non-Exec
//targets - datovy typ pole stringu, pole zleva do prava vyhodnocujicich se aliasu targetu. napr ["lasttarget", "lastttack"], nebo [] pro tercik
//pokud jeden z targetu existuje waitne ho jako objec vraci true pri uspechu
function TryWaitTargetObject(targets) {
  if (targets) {
    var target = ParseTargets(targets);
    if (target.Success) {
      Orion.WaitTargetObject(target.Serial);
      return true;
    }
  }
  return false;
}

//---------------------------------------------------------------------------------------------

function ParseTargets(targets) {
  var result = NewTarget();

  if (targets) {
    for (var i = 0; i < targets.length; i++) {


      var target = ParseTarget(targets[i]);
      if (target.Success) {
        result = target;
        break;
      }
    }
  }
  return result;
}

//---------------------------------------------------------------------------------------------

//Aliasy
function ParseTarget(target) {
  //Todo vlastni target object { Success, X, Y, Serial, Obj }

  var result = NewTarget();
  result.Alias = target;


  if (target && target != null) {
    //var serial = null;

    if (target == "self") {
      result.Serial = Player.Serial();
    }
    else if (target == "lastattack") {
      result.Serial = Orion.ClientLastAttack();
    }
    else if (target == "lasttarget") {

      result.Serial = Orion.ClientLastTarget();

    } else if (target == "lastenemy") {
      result.Serial = ClientLastEnemy();
    }



    result.Object = Orion.FindObject(result.Serial);
    result.Success = result.Object != null;
    if (!result.Success)
      result.Serial = 0;
  }
  return result;//Nebo ParseTarget? 
}



//---------------------------------------------------------------------------------------------

//Non-Exec
//vrati id posledniho charu zamereneho SelectNextTargetEnemy
function ClientLastEnemy() {
  var value = Orion.GetGlobal("SelectNextTargetEnemy_Last");
  if (value == "") {
    return 0x00000000;
  }
  else {
    return value;
  }

  //return Orion.GetGlobal("SelectNextTargetEnemy_Last");
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vrati serazene pole podle vzdalenosti vzestupne
//objectArray - datovy typ pole objektu -
function SortObjectByDistanceAsc(objectArray) {
  if (objectArray && objectArray.length > 1) {

    var swap = false;
    do {
      swap = false;

      for (var i = 1; i < objectArray.length; i++) {
        var curr = objectArray[i];
        var prev = objectArray[i - 1];

        var currDistance = Orion.GetDistance(curr.Serial());
        var prevDistance = Orion.GetDistance(prev.Serial());

        if (currDistance < prevDistance) {

          objectArray[i - 1] = curr;
          objectArray[i] = prev;
          swap = true;
        }
      }
    } while (swap)

  }


  return objectArray;
}

//---------------------------------------------------------------------------------------------
//Non-Exec
//vrati serazene pole podle vzdalenosti vzestupne
//objectArray - datovy typ pole objektu -
function SortObjectBySerialAsc(objectArray) {
  if (objectArray && objectArray.length > 1) {

    var swap = false;
    do {
      swap = false;

      for (var i = 1; i < objectArray.length; i++) {
        var curr = objectArray[i];
        var prev = objectArray[i - 1];

        var currCompare = curr.Serial();
        var prevCompare = prev.Serial();

        if (currCompare < prevCompare) {

          objectArray[i - 1] = curr;
          objectArray[i] = prev;
          swap = true;
        }
      }
    } while (swap)

  }


  return objectArray;
}


//---------------------------------------------------------------------------------------------
//Non-Exec
//vrati serazene pole podle hp vzestupne
//objectArray - datovy typ pole objektu -
function SortObjectByHitsAsc(objectArray) {
  if (objectArray && objectArray.length > 1) {

    var swap = false;
    do {
      swap = false;

      for (var i = 1; i < objectArray.length; i++) {
        var curr = objectArray[i];
        var prev = objectArray[i - 1];

        var currCompare = curr.Hits();
        var prevCompare = prev.Hits();

        if (currCompare < prevCompare) {

          objectArray[i - 1] = curr;
          objectArray[i] = prev;
          swap = true;
        }
      }
    } while (swap)

  }


  return objectArray;
}
//---------------------------------------------------------------------------------------------

//Non-Exec
//prohledava ve spirale od nejblisho po nevzdalenejsho nepratele a postupne je ozacuje. Napr na kolecko mysi. Hledani se po 800ms ve vychozim nastaveni resetuje  - 1x volani = 1x posun
//   distance - datovy typ int - vzdalenost do ktere hleda - 30
//   resetTime - datovy typ int - cas v ms za jed dlouho se resetuje po posledni volani  -800
//   printHits - datovy typ boolean - vypisuj hp nad zamerenym - true
//   clearHits - datovy typ boolean -vypise 5x hlasku prazdnou nad predchozim a tim promaze text nad jeho hlavou aby se nestosovali... je dobre mit nastavenou rozumnou dobu zonrazeni textu ve hre - false
//   closeStatusBar - datovy typ boolean - zavry prechdozi status bar - true
//   showTrack - datovy typ boolean - - false - NEFUGUJE
//   sbarX - datovy typ int - souradnice min x kde se ma zobrazovat status bar - 150 
//   sbarXMax - datovy typ int -souradnice max x kde se ma zobrazovat status bar - 300
//   sbarY - datovy typ int -souradnice min y kde se ma zobrazovat status bar - 150
//   sbarYMax - datovy typ int -souradnice max y kde se ma zobrazovat status bar - 600
function SelectNextTargetEnemy(distance, resetTime, printHits, clearHits, closeStatusBar, showTrack, sbarX, sbarXMax, sbarY, sbarYMax) {

  if (!distance) distance = 30;
  if (!resetTime) resetTime = 800;
  if (printHits == undefined) printHits = true;
  if (clearHits == undefined) clearHits = false;
  if (closeStatusBar == undefined) closeStatusBar = true;
  if (!sbarX) sbarX = 150;
  if (!sbarXMax) sbarXMax = 300;
  if (!sbarY) sbarY = 150;
  if (!sbarYMax) sbarYMax = 600;
  if (showTrack == undefined) showTrack = true;//Neni podpora?

  var charList = GetCharacterList(distance, false);
  var enemyList = GetAllEnemyList(charList);

  enemyList = SortObjectByDistanceAsc(enemyList);


  var lastEnemy = Orion.GetGlobal("SelectNextTargetEnemy_Last");
  var lastTime = Orion.GetGlobal("SelectNextTargetEnemy_Last_Time");
  var currentTime = Orion.Time();
  var lastTimeMs = GetTimeMiliseconds(lastTime);
  var currentTimeMs = GetTimeMiliseconds(currentTime);

  var timeSpan = currentTimeMs - lastTimeMs;

  if (timeSpan > resetTime) {
    lastEnemy = "";
  }

  var index = 0;

  if (lastEnemy && lastEnemy != "") {
    for (var i = 0; i < enemyList.length; i++) {
      var obj = enemyList[i];
      if (obj.Serial() == lastEnemy && i < enemyList.length - 1) {
        index = i + 1;
        break;
      }

    }
  }

  if (enemyList.length > 0) {
    var prevObj = Orion.FindObject(lastEnemy);
    var obj = enemyList[index];
    Orion.SetGlobal("SelectNextTargetEnemy_Last", obj.Serial());

    if (printHits)
      PrintCharacterHitsOver(obj.Serial());

    Orion.ShowStatusbar(obj.Serial(), Orion.Random(sbarX, sbarXMax), Orion.Random(sbarY, sbarYMax));

    if (showTrack) {


      //Orion.Track(true, obj.X(), obj.Y());
    }

    if (prevObj != null) {
      //Todo idealne vyresit jako oznaceni postavy v klientovy ;/, toto dole je hnuj v journalu

      if (clearHits) {
        Orion.CharPrint(prevObj.Serial(), color_green, "");
        Orion.CharPrint(prevObj.Serial(), color_green, "");
        Orion.CharPrint(prevObj.Serial(), color_green, "");
        Orion.CharPrint(prevObj.Serial(), color_green, "");
        Orion.CharPrint(prevObj.Serial(), color_green, "");
      }
      if (closeStatusBar)
        Orion.CloseStatusbar(prevObj.Serial());
    }

  } else {
    //Orion..Track(false);
    Orion.SetGlobal("SelectNextTargetEnemy_Last", "");
  }

  Orion.SetGlobal("SelectNextTargetEnemy_Last_Time", Orion.Time());
}

//Targeting

//Characters

//---------------------------------------------------------------------------------------------

//Non-Exec
//vypise hits/maxhist nad charem cervene pokud enemy zelene jinak. Pismo podle stavy HP
//   serial - datovy typ serial, id charu nad ktery budeme vypisovat
function PrintCharacterHitsOver(serial) {

  var obj = Orion.FindObject(serial);
  var isEmeny = IsEnemy(obj);

  if (obj != null && Orion.GetDistance(obj.Serial()) <= charactersVisibleDistance) {

    //isEmeny
    if (isEmeny) {
      Orion.CharPrint(obj.Serial(), GetPrintEnemyColorByHits(obj.Serial()), "[" + obj.Hits() + "/" + obj.MaxHits() + "]");
    } else {
      Orion.CharPrint(obj.Serial(), GetPrintAlieColorByHits(obj.Serial()), "[" + obj.Hits() + "/" + obj.MaxHits() + "]");
    }
  }
}

//---------------------------------------------------------------------------------------------


//Non-Exec
//vrati pole charu v dane vzdalenosti
//   distance - datovy typ int, vzadalenost do ktere  hleda
//   includePlayer - datovy typ bollean, true pokud ma vracet i hrace default false
function GetCharacterList(distance, includePlayer) {
  if (includePlayer == undefined) includePlayer = false;
  if (distance == undefined) distance = charactersVisibleDistance;
  var list = [];
  var allList = Orion.FindList("all", ground, '', distance);
  // Orion.FindType("!0x0190|!0x0191", "-1", "ground", "near|live", 22, "blue|gray|criminal|orange|red"); ??? proc nefunguje?
  // Orion.Split(Orion.FindType("-1", "-1", "ground", distance, "mobile"), ","); 

  //	var tempList = "__tempAllCharsList";
  //	Orion.AddFindList(tempList, 0xFFFF, 0xFFFF, "All");

  for (var i = 0; i < allList.length; i++) {

    var obj = Orion.FindObject(allList[i]);
    if (obj != null) {
      if (obj.Mobile() && (includePlayer || obj.Serial() != Player.Serial())) {
        list.push(obj);
      }
    }
  }
  return list;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vrati pole nepratel ;]
//   charList - datovy typ pole charu, pokud neni tak si najde vse do 30 poli
function GetAllEnemyList(charList) {
  var list = [];
  if (!charList || charList.length == 0) {
    charList = GetCharacterList(30, false);
  }
  //todo a blue a green co nejsou aktivni friend

  for (var i = 0; i < charList.length; i++) {
    var obj = charList[i];
    //Orion.Print("" + obj.Name() + " - " +obj.Notoriety() );
    if (IsEnemy(obj)) {
      list.push(obj);
    }
  }
  return list;
}

//---------------------------------------------------------------------------------------------
//Non-Exec
//vrati true pokud je objekt nepritel
//obj - datovy typ objekt charu
function IsEnemy(obj) {
  if (obj != null) {

    return obj.Notoriety() == 3 || obj.Notoriety() == 4 || obj.Notoriety() == 5 || obj.Notoriety() == 6 && !obj.CanChangeName();
  }

  return false;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//TODO 
function GetActiveFriendList() {
  var list = [];
  var friendList = Orion.GetFriendList();
  return list;
}


//---------------------------------------------------------------------------------------------

//Non-Exec
//vrati pole mobu v pozadovane vzdalenosti
//   distance - datovy typ int, vzadalenost do ktere  hleda
function GetCurrentMobs(distance) {

  if (distance == undefined) distance = charactersVisibleDistance;

  var charList = GetCharacterList(distance, false);

  var result = [];

  for (var i = charList.length - 1; i >= 0; i--) {

    var mobObj = charList[i];

    if (mobObj != null) {
      var distance = Orion.GetDistance(mobObj.Serial());

      if (mobObj.CanChangeName()) {
        result.push(mobObj);
      }
    }
  }
  return result;
}

//Player Utils

//---------------------------------------------------------------------------------------------

//Non-Exec
//prepne war mod, pokud byl peace zustane war pokud ne prene z peace zas do war vysledek je tedy vzdy war
function SwitchWarModeOn() {

  var wm = Player.WarMode();
  var state = !wm;
  Orion.WarMode(state);
  Orion.Wait(100);
  if (!state) {
    Orion.WarMode(true);
  }
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//pokud neni zaply warmod zapne jinak nic	
function EnsureWarMode() {
  var wm = Player.WarMode();
  if (!wm) {
    Orion.WarMode(true);
  }
}

//---------------------------------------------------------------------------------------------

//Executable
//nekonecna smycka ktera resi prejmenovani, prejmenuje vse co se objevi ;] snad. Jmena generuje na zaklade prefixu hrace + nahodny string a sufix 2 velkych znaku
function rename() {
  var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  var runCounter = 0;


  while (true) {

    var list = GetCharacterList(charactersVisibleDistance, false);//Orion.FindList(summons, ground, '', charactersVisibleDistance);

    for (var i = 0; i < list.length; i++) {

      var mobObj = list[i];


      if (mobObj != null) {

        var mobSerial = mobObj.Serial();
        var canRename = mobObj.CanChangeName();
        var mobName = mobObj.Name();

        if (canRename) {

          if (!mobName || mobName == "") {
            Orion.GetStatus(mobSerial);
            mobName = mobObj.Name();
          }

          if (!IsRenamedByPlayer(mobName)) {

            var resultName = "";
            for (var r = 0; r < 5; r++) {
              var rand = Orion.Random(chars.length);
              resultName = resultName + chars[rand];
            }

            resultName = GetPlayerShorCode() + resultName;
            resultName = resultName.substring(0, resultName.length - 2) + String_ToUpper(resultName[resultName.length - 2]) + String_ToUpper(resultName[resultName.length - 1]);

            //Orion.AddIgnoreListObject(summonsIgnore, mobSerial);
            Orion.RenameMount(mobSerial, resultName);

            var sychr = 0;
            var newName = mobName;

            while (newName == mobName && sychr < 750) {

              Orion.GetStatus(mobSerial);
              Orion.Wait(150);
              mobObj = Orion.FindObject(mobSerial);
              newName = mobObj.Name();
              sychr = sychr + 150;
            }

            var renameSuccess = newName != mobName;
            if (renameSuccess) { }

            Orion.CharPrint(mobObj.Serial(), color_pureWhite, '[ ' + newName + " ]");
          }

        }
      }
    }
    Orion.Wait(100);
    runCounter = runCounter + 100;
  }
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vraci objekt charu
//serialOrObj - datovy typ serial nebo objekt charu,  
function GetFindObject(serialOrObj) {
  if (serialOrObj && serialOrObj.Serial && serialOrObj.Exists()) {
    return serialOrObj;
  } else {
    return Orion.FindObject(serialOrObj);
  }
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vraci true pokud objekt existuje a je prejmenovatelny
//mobSerial - datovy typ serial nebo objekt, 
function IsMob(mob) {
  var mobObj = GetFindObject(mob);
  if (mobObj && mobObj != null) {
    return mobObj.CanChangeName();
  }

  return false;
}
//---------------------------------------------------------------------------------------------

//Non-Exec
//vraci objekt cile pro mobkill nebo null, cil se bere ten ktery jsem zameril prikazem kill prvnim volanim mobkillu. resetuje mobstop mobcome
//mobSerial - datovy typ serial, id moba
function GetMobEnemy(mobSerial) {

  var target = GetFindObject(Orion.GetGlobal("MobKill_Target"));
  if (target == null || Orion.GetDistance(target) > charactersVisibleDistance) {

    var prevClientLast = Orion.GetGlobal("MobKill_PrevClientLastTarget");
    if (prevClientLast != "") {


      target = GetFindObject(Orion.ClientLastTarget());
      if (target != null && Orion.GetDistance(target) <= charactersVisibleDistance) {
      }
    }
    Orion.SetGlobal("MobKill_PrevClientLastTarget", Orion.ClientLastTarget());
  }
  return target;
}

//Zatim 1x todo multiple
function ResetMobTargets() {
  Orion.SetGlobal("MobKill_Target", "");
  Orion.SetGlobal("MobKill_PrevClientLastTarget", "");
  Orion.SetGlobal("MobGo_Last", "");
}

//---------------------------------------------------------------------------------------------

//Executable
//rika prikaz all go, pokud zamerite suma tak se ulozi jako posledni zvoleni a nasledne volani vola meno toho suma. 
function MobGo() {
  var text = "all go";
  var obj = GetFindObject(Orion.GetGlobal("MobGo_Last"));// GetFindObject(Orion.ClientLastTarget());
  var isClientLast = false;
  if (obj == null) {
    obj = GetFindObject(Orion.ClientLastTarget());
    isClientLast = true;
  }

  if (obj != null && IsMob(obj)) {
    text = obj.Name() + " go";

    if (isClientLast)
      Orion.ClientLastTarget(0);

    Orion.SetGlobal("MobGo_Last", obj.Serial());
  }
  SayWithColor(text, 0x00B3);
}

//---------------------------------------------------------------------------------------------

//Executable
//krome textu All come resetuje target mobkillu a mobgo 
function MobCome() {
  SayWithColor("all come", 0x00B3);
  ResetMobTargets();
}


//---------------------------------------------------------------------------------------------

//Executable
//krome textu All stop resetuje target mobkillu a mobgo
function MobStop() {
  SayWithColor("all stop", 0x00B3);
  ResetMobTargets();
}

//---------------------------------------------------------------------------------------------

//Executable
//postupne vola jmena vsech mobu na kill a bud vyvola tercik nebo automaticky na posledni zamereny cil. Cil resetuje mobstop a mobcome. Barva vlani odpovida zraneni moba 
//printSufix - datovy typ boolean, true pokud ma nad volanym mobem vypisovat jeho sufix, vypisuje v barve zraneni default true
function MobKill(printSufix) {
  var lastTime = Orion.GetGlobal("MobKill_Last_Time");
  var currentTime = Orion.Now();
  var timeSpan = currentTime - lastTime;
  var mobs = GetCurrentMobs();

  Orion.Print("printSufix" + printSufix);

  if (printSufix == undefined) printSufix = true;

  if (mobs.length > 0) {
    Orion.SetGlobal("MobKill_Last_Time", Orion.Now());
    var enemy = GetMobEnemy(mobObj);
    //Todo chek jesli enemy != mob  preskocit
    var lastSerial = Orion.GetGlobal("MobKill_LastSerial");
    var index = 0;

    if (lastSerial && lastSerial.length > 0) {
      for (var i = 0; i < mobs.length; i++) {
        var s = mobs[i];

        if (s.Serial() == lastSerial && i < mobs.length - 1) {
          index = i + 1;

          break;
        }
      }
    }

    var mobObj = mobs[index];
    var mobName = mobObj.Name();
    var c = GetPrintAlieColorByHits(mobObj.Serial());
    Orion.SetGlobal("MobKill_LastSerial", mobObj.Serial());

    if (enemy != null) {
      if (timeSpan > 3500) {
        PrintCharacterHitsOver(enemy.Serial());
      }
      Orion.SetGlobal("MobKill_Target", enemy.Serial());
      Orion.WaitTargetObject(enemy.Serial());
    }

    SayWithColor(mobName + " kill", c);
    if (printSufix)
      Orion.CharPrint(mobObj.Serial(), c, MobNameSufix(mobName));

  } else {
    Orion.Say("all kill");
  }

}
//---------------------------------------------------------------------------------------------

//Executable
//rekne ve hre text pozadovanou barvou, je to hack docasne zmeni globalni barvu a nasledne vati zpet
//text - datovy typ string
//color - datovy typ barva   
function SayWithColor(text, color) {

  var originalState = Orion.GetFontColor();
  var orignalValue = Orion.GetFontColorValue();
  Orion.SetFontColor(true, color);
  Orion.Say(text);
  Orion.SetFontColor(originalState, orignalValue);
}


//---------------------------------------------------------------------------------------------

//Non-Exec
//vraci jedu s 6 barev ktera reprezentuje uroven zraneni charakteru po 20% nebo vychozi. Zelena pro kamose
//serial - datovy typ serial, id chrakteru       
function GetPrintAlieColorByHits(serial) {
  var c = 0x023b;

  var mobObj = Orion.FindObject(serial);
  var h = mobObj.Hits();
  var mh = mobObj.MaxHits();
  var perc = h / mh;

  if (perc >= 0.8)
    c = 0x003e;
  else if (perc >= 0.6)
    c = 0x003f;
  else if (perc >= 0.4)
    c = 0x0040;
  else if (perc >= 0.2)
    c = 0x0041;
  else if (perc >= 0.1)
    c = 0x0042;

  return c;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vraci jedu s 6 barev ktera reprezentuje uroven zraneni charakteru po 20% nebo vychozi. Cervena pro ne-kamose
//serial - datovy typ serial, id chrakteru   
function GetPrintEnemyColorByHits(serial) {

  var c = 0x021d;

  var mobObj = Orion.FindObject(serial);
  var h = mobObj.Hits();
  var mh = mobObj.MaxHits();
  var perc = h / mh;

  if (perc >= 0.8)
    c = 0x0025;
  else if (perc >= 0.6)
    c = 0x0026;
  else if (perc >= 0.4)
    c = 0x0027;
  else if (perc >= 0.2)
    c = 0x0028;
  else if (perc >= 0.1)
    c = 0x0029;

  return c;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vraci posledni dva znaky z nazvu nebo null
//name - datovy typ string, nazev
function MobNameSufix(name) {

  var result = null;
  if (name && name.length > 1) {
    result = name[name.length - 2] + name[name.length - 1];
  }

  return result;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vraci true pokud nazev zacina playerShorCode jinak false
//name - datovy typ string, porovnavany nazev
function IsRenamedByPlayer(name) {

  if (name && name.length > 0) {
    var code = GetPlayerShorCode();
    if (name.length < code.length) {
      return false;
    }

    for (var i = 0; i < code.length; i++) {
      if (name[i] != code[i]) {
        return false;
      }
    }
    return true;

  }
  return false;
}

//---------------------------------------------------------------------------------------------

var playerShorCode = "";

//Non-Exec
//vraci string se 3 znaky ktere reprezentuji jmeno hrace 
function GetPlayerShorCode() {

  if (playerShorCode == "") {
    var name = Player.Name();
    if (!name || name == "") {
      Orion.Click(Player.Serial());
      Orion.Wait(250);
      name = Player.Name();

    }

    name = String_ToLower(name);
    name = String_ReplaceChar(name, " ", "");
    name = String_ReplaceChar(name, "-", "");
    name = String_ReplaceChar(name, "'", "");
    name = String_ReplaceChar(name, "_", "");
    name = String_ReplaceChar(name, ".", "");
    name = String_ReplaceChar(name, ",", "");

    playerShorCode = name;

    if (name.length > 2) {
      var mid = (name.length / 2) | 0;
      //Orion.Print("" + mid);
      playerShorCode = name[0] + name[mid] + name[name.length - 1];
    }

  }

  return playerShorCode;
}

//Utils GameObject

var graphicArray_Containers = [0x0E40, 0x0E41, 0x09B0, 0x0E75, 0x0E76, 0x0E77, 0x0E78, 0x0E79, 0x0E7D];

//---------------------------------------------------------------------------------------------
//spatny ale nejaky ;]
function GetObjectArrayDiff(arrayA, arrayB) {
  var result = [];
  for (var a = 0; a < arrayA.length; a++) {
    var found = false;

    for (var b = 0; b < arrayB.length; b++) {
      if (arrayA[a].Serial() == arrayB[b].Serial()) {
        found = true;
        break;
      }
    }

    if (!found) {
      result.push(arrayA[a]);
    }
  }
  return result;
}

//---------------------------------------------------------------------------------------------
//Orion.CharPrint(Player.Serial(), GetSpellPrintColor(curSpell), "" + curSpell);
function SelectNextGetGlobal(items, global) {

  var selected = Orion.GetGlobal(global);
  var index = 0;

  if (selected && selected.length > 0) {
    for (var i = 0; i < items.length; i++) {

      var s = items[i];
      if (s == selected && i < items.length - 1) {
        index = i + 1;
      }
    }
  }

  var curr = items[index];

  Orion.SetGlobal(global, curr);

  return curr;
}

//---------------------------------------------------------------------------------------------

function ToObjectList(strList) {

  var result = [];

  if (strList.length > 0) {

    for (var i = 0; i < strList.length; i++) {
      result.push(Orion.FindObject(strList[i]));
    }
  }
  return result;

}

//---------------------------------------------------------------------------------------------

//Non-Exec
//prohleda rekuzrovne zname kontejnery a najde vnich pozadavane polozky z listu, vraci pole string ID
//listName - datovy typ string, nazev ulozeneho listu v zalozce Listy
//cont - datovy typ serial, container ve kterem zaciname
function FindTypeObjRecursive(graphic, color, cont) {
  if (cont === undefined) cont = "self";
  return ToObjectList(Orion.Split(Orion.FindType(graphic, color, cont), ","));

}

//---------------------------------------------------------------------------------------------

//Non-Exec
//prohleda rekuzrovne zname kontejnery a najde vnich pozadavane polozky z listu, vraci pole objektu
//listName - datovy typ string, nazev ulozeneho listu v zalozce Listy
//cont - datovy typ serial, container ve kterem zaciname
function FindListObjRecursive(listName, cont) {
  if (cont === undefined) cont = "self";

  return ToObjectList(Orion.FindList(listName, container = cont));
}

//---------------------------------------------------------------------------------------------


//Utils

var alphaLower = "abcdefghijklmnopqrstuvwxyz";
var alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";//abcdefghijklmnopqrstuvwxyz";

//---------------------------------------------------------------------------------------------

//Non-Exec
//prevete text do malych pismen
//text - datovy typ string, text k prevodu
function String_ToLower(text) {

  var result = "";

  for (var i = 0; i < text.length; i++) {
    var chr = text[i];
    for (var a = 0; a < alphaUpper.length; a++) {

      if (chr == alphaUpper[a]) {
        chr = alphaLower[a];
      }
    }
    result = result + chr;
  }
  return result;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//prevete text do velkych pismen
//text - datovy typ string, text k prevodu
function String_ToUpper(text) {
  var result = "";
  if (text != undefined) {
    for (var i = 0; i < text.length; i++) {
      var chr = text[i];
      for (var a = 0; a < alphaLower.length; a++) {

        if (chr == alphaLower[a]) {
          chr = alphaUpper[a];
        }
      }
      result = result + chr;
    }
  }
  return result;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//nahradi hledany znak
//text - datovy typ string, text k nahrazeno
//search - datovy typ char, hledany znak
//replacement - datovy typ char, nahrazujici znak
function String_ReplaceChar(text, search, replacement) {
  var result = "";

  if (text != undefined) {
    for (var i = 0; i < text.length; i++) {

      var ch = text[i];
      if (ch == search) {
        ch = replacement;
      }

      result = result + ch;

    }
  }
  return result;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vrati true pokud hledany text zacina hledanym textem
//text - datovy typ string, ktery bude porovnanan
//search - datovy typ string, hledany text
function String_StartWith(text, search) {

  if (text && text.length > 0 && search && search.length > 0) {

    if (text.length < search.length) {
      return false;
    }

    for (var i = 0; i < search.length; i++) {
      if (text[i] != search[i]) {
        return false;
      }
    }
    return true;

  }
  return false;

}

//---------------------------------------------------------------------------------------------

//Non-Exec
//vrati true pokud pole obsahuje hledanou polozku
//array - datovy typ pole, ktere bude prohledano
//search - datovy typ objekt pole, polozka ktera bude heldana
function Array_Contains(array, search) {

  for (var i = 0; i < array.length; i++) {
    if (array[i] == search) {
      return true;
    }
  }

  return false;
}

//---------------------------------------------------------------------------------------------

//Non-Exec
//prevede pole do retezce odeleneho carkou
//strValue - datovy typ string, text ze ktereho bude pole vytezeno
//separator - datovy typ string, odelovac
function Array_FromString(strValue, separator) {
  if (separator == undefined) separator = ",";

  var arr = [];

  var srtList = Orion.Split(strValue + "", separator);
  for (var i = 0; i < srtList.length; i++) {
    arr.push(srtList[i]);
  }

  return arr;

}

//---------------------------------------------------------------------------------------------

//Non-Exec
//prevede pole do retezce odeleneho carkou
//arr - datovy typ pole, ktere bude spojeno
//separator - datovy typ string, odelovac
function Array_ToString(arr, separator) {
  if (separator == undefined) separator = ",";

  var result = "";

  for (var i = 0; i < arr.length; i++) {

    if (result == "") {
      result = arr[i];
    } else {
      result = result + separator + arr[i];
    }
  }

  return result;

}

//---------------------------------------------------------------------------------------------
//Obsolete - existuje toto ;] - Orion.Now();
//Non-Exec
//vrati cas v milisekundach z vstupniho casoveho retezce
//timeString - datovy typ string, format casi pres Orion.Time()
function GetTimeMiliseconds(timeString) {
  var result = 0;

  if (timeString && timeString != null && timeString != "") {

    var split = Orion.Split(timeString, ".");
    var split2 = Orion.Split(split[0], ":");

    var h = split2[0];
    var m = split2[1];
    var s = split2[2];
    var ms = split[1];
    result = ((h * 3600) + (m * 60) + s) * 1000 + (ms - 1000);
  }

  return result;
}


	   //---------------------------------------------------------------------------------------------	    	