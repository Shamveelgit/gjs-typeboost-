const St = imports.gi.St
const Gio =  imports.gi.Gio
const Clutter = imports.gi.Clutter
const GLib = imports.gi.GLib
const Main = imports.ui.main
const panelMenu = imports.ui.panelMenu
const ExtensionUtils = imports.misc.extensionUtils
const ui = imports.ui

let button;

function enable() {
    button = new panelMenu.Button(0.0,"Test button")
    let box = new St.BoxLayout({
        vertical : false,
        
    })
    let btn = new St.Button({
        label : "Test",
        reactive : true,
        style_class : "btn",
        toggle_mode : true
    })
    let label = new St.Label({
        text : 'Say hello',
        x_align : Clutter.ActorAlign.CENTER
    })
    box.add_actor(btn)
    box.add_actor(label)
    button.add_child(box)
    
}
function disable() {
    Main.notify("Disabled good")
}