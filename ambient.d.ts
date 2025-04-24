typescript
// Type definitions for GJS modules used in GNOME Shell 43 extensions

// Event types for button and other interactions
type btnEventType =
  | "button-press-event"
  | "button-release-event"
  | "captured-event"
  | "destroy"
  | "enter-event"
  | "event"
  | "hide"
  | "key-focus-in"
  | "key-focus-out"
  | "key-press-event"
  | "key-release-event"
  | "leave-event"
  | "motion-event"
  | "parent-set"
  | "pick"
  | "queue-relayout"
  | "realize"
  | "resource-scale-changed"
  | "scroll-event"
  | "show"
  | "stage-views-changed"
  | "touch-event"
  | "transition-stopped"
  | "transitions-completed"
  | "unrealize";

// Clutter event types
enum EventType {
  KEY_PRESS,
  KEY_RELEASE,
  BUTTON_PRESS,
  BUTTON_RELEASE,
  MOTION,
  TOUCH_BEGIN,
  TOUCH_UPDATE,
  TOUCH_END,
  SCROLL,
  ENTER,
  LEAVE,
  STAGE_STATE,
  DESTROY,
  FOCUS,
  BLUR,
}

// imports.gi.Atk (Accessibility toolkit)
declare namespace imports.gi.Atk {
  enum Role {
    INVALID,
    BUTTON,
    LABEL,
    MENU_ITEM,
    CHECK_BOX,
    RADIO_BUTTON,
    SLIDER,
    TEXT,
    WINDOW,
    DIALOG,
    COMBO_BOX,
    LIST_ITEM,
  }
}

// imports.gi.Clutter (Layout and rendering)
declare namespace imports.gi.Clutter {
  class Actor {
    constructor(params?: {
      width?: number;
      height?: number;
      x?: number;
      y?: number;
      layout_manager?: LayoutManager;
      opacity?: number;
      reactive?: boolean;
      visible?: boolean;
      background_color?: Color;
      clip_to_allocation?: boolean;
    });

    add_child(child: Actor): void;
    remove_child(child: Actor): void;
    remove_all_children(): void;
    set_size(width: number, height: number): void;
    set_position(x: number, y: number): void;
    set_pivot_point(x: number, y: number): void;
    set_scale(x_scale: number, y_scale: number): void;
    set_rotation_angle(axis: RotateAxis, angle: number): void;
    set_opacity(opacity: number): void;
    show(): void;
    hide(): void;
    destroy(): void;
    get_parent(): Actor | null;
    get_child_at_index(index: number): Actor | null;
    get_n_children(): number;
    connect(event: string, callback: (...args: any[]) => boolean | void): number;
    disconnect(id: number): void;
    emit(event: EventType | string, ...args: any[]): void;
    grab_key_focus(): void;
    set_reactive(reactive: boolean): void;
    set_pointer_events(enabled: boolean): void;
    set_layout_manager(manager: LayoutManager | null): void;
    queue_redraw(): void;
    queue_relayout(): void;
    raise_top(): void;
    lower_bottom(): void;
    set_clip(clip_x: number, clip_y: number, clip_width: number, clip_height: number): void;
    remove_clip(): void;
    set_background_color(color: Color | null): void;
    set_easing_duration(msecs: number): void;
    set_easing_mode(mode: EasingMode): void;
    add_effect(effect: Effect): void;
    remove_effect(effect: Effect): void;
    get_allocation_box(): { x1: number; y1: number; x2: number; y2: number };
    get_paint_box(): { x1: number; y1: number; x2: number; y2: number };
    get_transformed_position(): [number, number];
    get_transformed_size(): [number, number];
    map(): void;
    unmap(): void;

    visible: boolean;
    opacity: number;
    width: number;
    height: number;
    x: number;
    y: number;
    reactive: boolean;
    x_align: ActorAlign;
    y_align: ActorAlign;
    scale_x: number;
    scale_y: number;
    rotation_angle_z: number;
    pivot_point: { x: number; y: number };
    mapped: boolean;
    realized: boolean;
  }

  enum EasingMode {
    LINEAR,
    EASE_IN_QUAD,
    EASE_OUT_QUAD,
    EASE_IN_OUT_QUAD,
    EASE_IN_CUBIC,
    EASE_OUT_CUBIC,
    EASE_IN_OUT_CUBIC,
    EASE_IN_BOUNCE,
    EASE_OUT_BOUNCE,
  }

  interface KeyEvent {
    type: EventType;
    keyval: number;
    keycode: number;
    state: KeyModifier;
    unicode: string;
    source: Actor | null;
    timestamp: number;
    get_source(): Actor | null;
    get_time(): number;
    get_state(): KeyModifier;
    get_coords(): [number, number];
  }

  enum KeyModifier {
    SHIFT_MASK = 1,
    CONTROL_MASK = 2,
    ALT_MASK = 4,
    SUPER_MASK = 8,
    HYPER_MASK = 16,
    META_MASK = 32,
  }

  interface ButtonEvent {
    type: EventType;
    button: number;
    click_count: number;
    state: KeyModifier;
    x: number;
    y: number;
    source: Actor | null;
    timestamp: number;
    get_source(): Actor | null;
    get_time(): number;
    get_state(): KeyModifier;
    get_coords(): [number, number];
  }

  interface MotionEvent {
    type: EventType;
    x: number;
    y: number;
    state: KeyModifier;
    source: Actor | null;
    timestamp: number;
    get_source(): Actor | null;
    get_time(): number;
    get_state(): KeyModifier;
    get_coords(): [number, number];
  }

  interface ScrollEvent {
    type: EventType;
    delta_x: number;
    delta_y: number;
    direction: ScrollDirection;
    source: Actor | null;
    timestamp: number;
    get_source(): Actor | null;
    get_time(): number;
    get_state(): KeyModifier;
    get_coords(): [number, number];
  }

  enum ScrollDirection {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    SMOOTH,
  }

  class LayoutManager {
    constructor();
    layout_changed(): void;
    set_container(container: Actor | null): void;
    get_preferred_width(container: Actor, for_height: number): [number, number];
    get_preferred_height(container: Actor, for_width: number): [number, number];
  }

  class BoxLayout extends LayoutManager {
    constructor(params?: {
      orientation?: Orientation;
      spacing?: number;
      homogeneous?: boolean;
    });
    set_spacing(spacing: number): void;
    set_orientation(orientation: Orientation): void;
    set_homogeneous(homogeneous: boolean): void;
  }

  class Text extends Actor {
    constructor(params?: {
      text?: string;
      font_name?: string;
      color?: Color;
      editable?: boolean;
      selectable?: boolean;
      ellipsize?: imports.gi.Pango.EllipsizeMode;
    });
    set_text(text: string | null): void;
    set_font_name(font: string): void;
    set_color(color: Color): void;
    get_text(): string;
    set_editable(editable: boolean): void;
    set_selectable(selectable: boolean): void;
    set_ellipsize(mode: imports.gi.Pango.EllipsizeMode): void;
    set_line_alignment(alignment: imports.gi.Pango.Alignment): void;
    set_pango_attributes(attributes: imports.gi.Pango.AttrList | null): void;
    text: string;
    font_name: string;
    color: Color;
    editable: boolean;
    selectable: boolean;
  }

  class Effect {
    constructor();
    set_enabled(enabled: boolean): void;
    is_enabled(): boolean;
    queue_repaint(): void;
  }

  class Stage extends Actor {
    constructor();
    get_actor_at_pos(x: number, y: number): Actor | null;
    set_key_focus(actor: Actor | null): void;
    get_key_focus(): Actor | null;
  }

  enum Orientation {
    HORIZONTAL,
    VERTICAL,
  }

  enum ActorAlign {
    FILL,
    START,
    CENTER,
    END,
  }

  enum RotateAxis {
    X_AXIS,
    Y_AXIS,
    Z_AXIS,
  }

  interface Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    copy(): Color;
    free(): void;
  }

  interface Event {
    type: EventType;
    source: Actor | null;
    timestamp: number;
    get_source(): Actor | null;
    get_time(): number;
    get_state(): KeyModifier;
    get_coords(): [number, number];
  }
}

// imports.gi.St (UI components)
declare namespace imports.gi.St {
  class Widget extends imports.gi.Clutter.Actor {
    constructor(params?: {
      style_class?: string;
      reactive?: boolean;
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      can_focus?: boolean;
      opacity?: number;
      visible?: boolean;
      track_hover?: boolean;
      accessible_name?: string;
      accessible_role?: imports.gi.Atk.Role;
      clip_to_allocation?: boolean;
      layout_manager?: imports.gi.Clutter.LayoutManager;
    });

    add_style_class_name(className: string): void;
    remove_style_class_name(className: string): void;
    set_style(style: string | null): void;
    get_style_class_name(): string;
    set_clip_to_allocation(clip: boolean): void;
    set_reactive(reactive: boolean): void;
    set_accessible_name(name: string): void;
    set_accessible_role(role: imports.gi.Atk.Role): void;
    set_opacity(opacity: number): void;
    grab_key_focus(): void;
    has_focus(): boolean;
    queue_redraw(): void;
    queue_relayout(): void;
    set_transition_duration(duration: number): void;
    set_easing_mode(mode: imports.gi.Clutter.EasingMode): void;
    set_tooltip_text(text: string): void;
    remove_tooltip(): void;
    get_allocation_box(): { x1: number; y1: number; x2: number; y2: number };
    get_paint_box(): { x1: number; y1: number; x2: number; y2: number };
    set_position(x: number, y: number): void;
    set_size(width: number, height: number): void;
    sync_visibility(): void;
    set_pivot_point(x: number, y: number): void;
    set_scale(x_scale: number, y_scale: number): void;
    set_rotation_angle(axis: imports.gi.Clutter.RotateAxis, angle: number): void;
    add_effect(effect: imports.gi.Clutter.Effect): void;
    remove_effect(effect: imports.gi.Clutter.Effect): void;
    set_background_color(color: imports.gi.Clutter.Color | null): void;

    connect(event: btnEventType, callback: (...args: any[]) => boolean | void): number;
    connect_after(event: btnEventType, callback: (...args: any[]) => boolean | void): number;
    disconnect(id: number): void;
    emit(event: btnEventType, ...args: any[]): void;
    connect_swipe_gesture(callback: () => void): number;

    destroy(): void;
    show(): void;
    hide(): void;
    get_parent(): imports.gi.Clutter.Actor | null;
    get_children(): Widget[];

    visible: boolean;
    opacity: number;
    x: number;
    y: number;
    width: number;
    height: number;
    reactive: boolean;
    track_hover: boolean;
    can_focus: boolean;
    hover: boolean;
    x_align: imports.gi.Clutter.ActorAlign;
    y_align: imports.gi.Clutter.ActorAlign;
    style: string | null;
    layout_manager: imports.gi.Clutter.LayoutManager | null;
    scale_x: number;
    scale_y: number;
  }

  class BoxLayout extends Widget {
    constructor(params?: { vertical?: boolean; spacing?: number; homogeneous?: boolean });
    add_actor(child: Widget): void;
    remove_actor(child: Widget): void;
    remove_all_children(): void;
    set_vertical(vertical: boolean): void;
    set_spacing(spacing: number): void;
    set_homogeneous(homogeneous: boolean): void;
  }

  class Button extends Widget {
    constructor(params?: {
      label?: string;
      style_class?: string;
      reactive?: boolean;
      toggle_mode?: boolean;
      checked?: boolean;
      icon_name?: string;
    });
    label: string;
    checked: boolean;
    toggle_mode: boolean;
    set_label(label: string): void;
    set_toggle_mode(mode: boolean): void;
    get_checked(): boolean;
    set_checked(checked: boolean): void;
    set_icon_name(icon_name: string): void;
    connect(event: string, callback: (...args: any[]) => boolean | void): number;
  }

  class Label extends Widget {
    constructor(params?: {
      text?: string;
      style_class?: string;
      x_align?: imports.gi.Clutter.ActorAlign;
      y_align?: imports.gi.Clutter.ActorAlign;
      pango_attributes?: imports.gi.Pango.AttrList;
    });
    text: string;
    set_text(text: string): void;
    set_pango_attributes(attributes: imports.gi.Pango.AttrList | null): void;
    clutter_text: imports.gi.Clutter.Text;
  }

  class Icon extends Widget {
    constructor(params?: {
      icon_name?: string;
      style_class?: string;
      icon_size?: number;
      gicon?: imports.gi.Gio.Icon;
    });
    icon_name: string;
    icon_size: number;
    set_icon_size(size: number): void;
    set_gicon(gicon: imports.gi.Gio.Icon | null): void;
    set_icon_name(name: string): void;
  }

  class Entry extends Widget {
    constructor(params?: {
      text?: string;
      style_class?: string;
      hint_text?: string;
      primary_icon?: Icon;
      secondary_icon?: Icon;
    });
    text: string;
    set_text(text: string): void;
    set_hint_text(hint: string): void;
    set_primary_icon(icon: Icon | null): void;
    set_secondary_icon(icon: Icon | null): void;
    clutter_text: imports.gi.Clutter.Text;
    connect(event: string, callback: (...args: any[]) => boolean | void): number;
  }

  class ScrollView extends Widget {
    constructor(params?: {
      style_class?: string;
      hscrollbar_policy?: PolicyType;
      vscrollbar_policy?: PolicyType;
      enable_mouse_scrolling?: boolean;
    });
    set_policy(hscroll: PolicyType, vscroll: PolicyType): void;
    add_actor(actor: imports.gi.Clutter.Actor): void;
    remove_actor(actor: imports.gi.Clutter.Actor): void;
    get_hscroll_bar(): ScrollBar;
    get_vscroll_bar(): ScrollBar;
    set_scroll_adjustment(hadjustment: Adjustment, vadjustment: Adjustment): void;
  }

  class ScrollBar extends Widget {
    constructor(params?: { vertical?: boolean });
    set_scroll_adjustment(adjustment: Adjustment): void;
  }

  class Adjustment extends imports.gi.GObject.Object {
    constructor(params?: {
      value?: number;
      lower?: number;
      upper?: number;
      step_increment?: number;
      page_increment?: number;
    });
    set_value(value: number): void;
    get_value(): number;
    value: number;
    lower: number;
    upper: number;
    step_increment: number;
    page_increment: number;
  }

  class PopupMenu extends Widget {
    constructor(params?: { style_class?: string; reactive?: boolean; source_actor?: imports.gi.Clutter.Actor });
    add_menu_item(item: imports.ui.panelMenu.PopupMenuItem): void;
    remove_menu_item(item: imports.ui.panelMenu.PopupMenuItem): void;
    remove_all_menu_items(): void;
    toggle(): void;
    open(animate?: boolean): void;
    close(animate?: boolean): void;
    is_open(): boolean;
    set_source_actor(actor: imports.gi.Clutter.Actor): void;
    actor: imports.gi.Clutter.Actor;
  }

  class PanelMenuButton extends Widget {
    constructor(params?: { style_class?: string; reactive?: boolean });
    add_menu(menu: PopupMenu): void;
    remove_menu(menu: PopupMenu): void;
    set_menu(menu: PopupMenu): void;
    connect(event: string, callback: (...args: any[]) => boolean | void): number;
  }

  enum PolicyType {
    ALWAYS,
    AUTOMATIC,
    NEVER,
    EXTERNAL,
  }

  enum Side {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
  }
}

// imports.gi.Gio (File operations, settings)
declare namespace imports.gi.Gio {
  interface Icon {
    to_string(): string | null;
    equal(other: Icon): boolean;
  }

  class ThemedIcon implements Icon {
    constructor(params: { name: string });
    name: string;
    to_string(): string | null;
    equal(other: Icon): boolean;
  }

  class FileIcon implements Icon {
    constructor(params: { file: File });
    file: File;
    to_string(): string | null;
    equal(other: Icon): boolean;
  }

  class File {
    static new_for_path(path: string): File;
    static new_for_uri(uri: string): File;
    read(cancellable?: Cancellable | null): FileInputStream;
    append_to(flags: FileCreateFlags, cancellable?: Cancellable | null): FileOutputStream;
    create(flags: FileCreateFlags, cancellable?: Cancellable | null): FileOutputStream;
    delete(cancellable?: Cancellable | null): boolean;
    enumerate_children(attributes: string, flags: FileQueryInfoFlags, cancellable?: Cancellable | null): FileEnumerator;
    get_path(): string | null;
    get_uri(): string;
    load_contents(cancellable?: Cancellable | null): [boolean, Uint8Array, string | null];
    make_directory(cancellable?: Cancellable | null): boolean;
    copy(destination: File, flags: FileCopyFlags, cancellable?: Cancellable | null, progress_callback?: (current: number, total: number) => void): boolean;
    move(destination: File, flags: FileCopyFlags, cancellable?: Cancellable | null): boolean;
    get_basename(): string | null;
    get_parent(): File | null;
    query_info(attributes: string, flags: FileQueryInfoFlags, cancellable?: Cancellable | null): FileInfo;
    monitor_file(flags: FileMonitorFlags, cancellable?: Cancellable | null): FileMonitor;
  }

  class Settings {
    constructor(params: { schema_id: string; path?: string });
    get_string(key: string): string;
    set_string(key: string, value: string): boolean;
    get_int(key: string): number;
    set_int(key: string, value: number): boolean;
    get_boolean(key: string): boolean;
    set_boolean(key: string, value: boolean): boolean;
    get_strv(key: string): string[];
    set_strv(key: string, value: string[]): boolean;
    get_value(key: string): imports.gi.GLib.Variant;
    set_value(key: string, value: imports.gi.GLib.Variant): boolean;
    reset(key: string): void;
    connect(event: string, callback: (...args: any[]) => void): number;
    disconnect(id: number): void;
    bind(key: string, object: imports.gi.GObject.Object, property: string, flags: SettingsBindFlags): void;
    is_writable(key: string): boolean;
    list_keys(): string[];
    list_children(): string[];
  }

  class FileMonitor {
    connect(event: string, callback: (monitor: FileMonitor, file: File, other_file: File | null, event_type: FileMonitorEvent) => void): number;
    cancel(): boolean;
  }

  class FileInputStream {
    read_bytes(count: number, cancellable?: Cancellable | null): Bytes;
    close(cancellable?: Cancellable | null): boolean;
  }

  class FileOutputStream {
    write(bytes: Uint8Array, cancellable?: Cancellable | null): number;
    close(cancellable?: Cancellable | null): boolean;
  }

  class FileEnumerator {
    next_file(cancellable?: Cancellable | null): FileInfo | null;
    close(cancellable?: Cancellable | null): boolean;
  }

  class FileInfo {
    get_name(): string;
    get_file_type(): FileType;
    get_size(): number;
    get_modification_time(): imports.gi.GLib.TimeVal;
    get_attribute_string(attribute: string): string | null;
    get_content_type(): string | null;
    get_attribute_boolean(attribute: string): boolean;
  }

  class Bytes {
    get_data(): Uint8Array;
    get_size(): number;
  }

  class Cancellable {
    constructor();
    cancel(): void;
    is_cancelled(): boolean;
    reset(): void;
  }

  enum FileQueryInfoFlags {
    NONE,
    NOFOLLOW_SYMLINKS,
  }

  enum FileCreateFlags {
    NONE,
    REPLACE_DESTINATION,
  }

  enum FileCopyFlags {
    NONE,
    OVERWRITE,
    BACKUP,
    NOFOLLOW_SYMLINKS,
    ALL_METADATA,
  }

  enum FileType {
    UNKNOWN,
    REGULAR,
    DIRECTORY,
    SYMBOLIC_LINK,
    SPECIAL,
  }

  enum FileMonitorFlags {
    NONE,
    WATCH_MOVES,
    SEND_MOVED,
  }

  enum FileMonitorEvent {
    CHANGED,
    CHANGES_DONE_HINT,
    DELETED,
    CREATED,
    ATTRIBUTE_CHANGED,
    PRE_UNMOUNT,
    UNMOUNTED,
    MOVED,
  }

  enum SettingsBindFlags {
    DEFAULT,
    GET,
    SET,
    NO_SENSITIVITY,
    GET_NO_CHANGES,
    INVERT_BOOLEAN,
  }
}

// imports.gi.GLib (Utilities)
declare namespace imports.gi.GLib {
  function get_home_dir(): string;
  function get_user_data_dir(): string;
  function get_user_config_dir(): string;
  function get_tmp_dir(): string;
  function timeout_add(priority: number, interval: number, callback: () => boolean): number;
  function timeout_add_seconds(priority: number, interval: number, callback: () => boolean): number;
  function source_remove(id: number): boolean;
  function mkdir_with_parents(pathname: string, mode: number): number;
  function basename(path: string): string;
  function dirname(path: string): string;
  function build_filenamev(args: string[]): string;
  function get_current_time(): TimeVal;
  function spawn_command_line_async(command_line: string): boolean;
  function spawn_command_line_sync(command_line: string): [boolean, string | null, string | null, number];
  function idle_add(priority: number, callback: () => boolean): number;
  function markup_escape_text(text: string, length: number): string;
  function uuid_string_random(): string;
  function get_monotonic_time(): number;
  function get_environ(): string[];
  function find_program_in_path(program: string): string | null;
  function format_size(size: number): string;
  function get_language_names(): string[];

  interface TimeVal {
    tv_sec: number;
    tv_usec: number;
  }

  interface Variant {
    new_string(value: string): Variant;
    new_int32(value: number): Variant;
    new_boolean(value: boolean): Variant;
    get_string(): string;
    get_int32(): number;
    get_boolean(): boolean;
    print(deep: boolean): string;
    new_strv(value: string[]): Variant;
    get_strv(): string[];
  }

  enum Priority {
    HIGH = -100,
    DEFAULT = 0,
    HIGH_IDLE = 100,
    DEFAULT_IDLE = 200,
    LOW = 300,
  }
}

// imports.gi.Pango (Text layout and rendering)
declare namespace imports.gi.Pango {
  class AttrList {
    constructor();
    insert(attr: Attribute): void;
    insert_before(attr: Attribute): void;
    change(attr: Attribute): void;
    splice(other: AttrList, pos: number, len: number): void;
    filter(func: (attr: Attribute) => boolean): AttrList | null;
  }

  class Attribute {
    static new_foreground(red: number, green: number, blue: number): Attribute;
    static new_background(red: number, green: number, blue: number): Attribute;
    static new_font_desc(desc: FontDescription): Attribute;
    static new_weight(weight: Weight): Attribute;
    static new_style(style: Style): Attribute;
    static new_underline(underline: Underline): Attribute;
    start_index: number;
    end_index: number;
  }

  class FontDescription {
    constructor();
    static from_string(str: string): FontDescription;
    set_family(family: string): void;
    set_size(size: number): void;
    set_weight(weight: Weight): void;
    set_style(style: Style): void;
    to_string(): string;
  }

  enum Weight {
    THIN = 100,
    ULTRALIGHT = 200,
    LIGHT = 300,
    NORMAL = 400,
    MEDIUM = 500,
    SEMIBOLD = 600,
    BOLD = 700,
    ULTRABOLD = 800,
    HEAVY = 900,
  }

  enum Style {
    NORMAL,
    OBLIQUE,
    ITALIC,
  }

  enum Underline {
    NONE,
    SINGLE,
    DOUBLE,
    LOW,
    ERROR,
  }

  enum Alignment {
    LEFT,
    CENTER,
    RIGHT,
  }

  enum EllipsizeMode {
    NONE,
    START,
    MIDDLE,
    END,
  }

  class Layout {
    constructor(context: any);
    set_text(text: string, length: number): void;
    set_attributes(attrs: AttrList | null): void;
    set_font_description(desc: FontDescription | null): void;
    set_alignment(alignment: Alignment): void;
    set_ellipsize(ellipsize: EllipsizeMode): void;
    get_pixel_size(): [number, number];
    get_iter(): LayoutIter;
  }

  class LayoutIter {
    next_line(): boolean;
    get_line_extents(): [Rectangle, Rectangle];
    free(): void;
  }

  interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

// imports.gi.Cairo (Drawing)
declare namespace imports.gi.Cairo {
  class Context {
    constructor(surface: Surface);
    save(): void;
    restore(): void;
    set_source_rgb(red: number, green: number, blue: number): void;
    set_source_rgba(red: number, green: number, blue: number, alpha: number): void;
    set_line_width(width: number): void;
    move_to(x: number, y: number): void;
    line_to(x: number, y: number): void;
    curve_to(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    rectangle(x: number, y: number, width: number, height: number): void;
    arc(xc: number, yc: number, radius: number, angle1: number, angle2: number): void;
    fill(): void;
    stroke(): void;
    clip(): void;
    paint(): void;
    set_font_size(size: number): void;
    select_font_face(family: string, slant: FontSlant, weight: FontWeight): void;
    show_text(text: string): void;
  }

  class Surface {
    constructor();
    finish(): void;
  }

  enum FontSlant {
    NORMAL,
    ITALIC,
    OBLIQUE,
  }

  enum FontWeight {
    NORMAL,
    BOLD,
  }
}

// imports.gi.Shell (Shell-specific utilities)
declare namespace imports.gi.Shell {
  class App {
    constructor();
    get_id(): string;
    get_name(): string;
    get_description(): string | null;
    activate(): void;
    launch(timestamp: number, workspace: number): boolean;
    get_windows(): imports.gi.Meta.Window[];
    get_n_windows(): number;
    is_on_workspace(workspace: imports.gi.Meta.Workspace): boolean;
    request_quit(): void;
    get_icon(): imports.gi.Gio.Icon;
  }

  class AppSystem {
    constructor();
    static get_default(): AppSystem;
    lookup_app(id: string): App | null;
    get_running(): App[];
    get_installed(): App[];
    search(search_string: string): string[];
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  class WindowTracker {
    constructor();
    static get_default(): WindowTracker;
    get_window_app(window: imports.gi.Meta.Window): App | null;
    get_app_from_pid(pid: number): App | null;
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  class Screenshot {
    constructor();
    screenshot(filename: string, include_cursor: boolean): boolean;
    screenshot_window(filename: string, include_frame: boolean, include_cursor: boolean): boolean;
    screenshot_area(x: number, y: number, width: number, height: number, filename: string): boolean;
    pick_color(x: number, y: number): { color: imports.gi.Clutter.Color };
  }

  class Global {
    static get(): Global;
    display: imports.gi.Meta.Display;
    screen: imports.gi.Meta.Screen;
    stage: imports.gi.Clutter.Stage;
    get_current_time(): number;
    get_pointer(): [number, number, imports.gi.Clutter.KeyModifier];
    get_windows(): imports.gi.Meta.Window[];
    get_window_actors(): WindowActor[];
    begin_modal(timestamp?: number): boolean;
    end_modal(timestamp?: number): void;
    get_session_mode(): string;
  }

  class WindowActor extends imports.gi.Clutter.Actor {
    meta_window: imports.gi.Meta.Window;
    get_meta_window(): imports.gi.Meta.Window;
  }
}

// imports.gi.Gdk (Display and input handling)
declare namespace imports.gi.Gdk {
  class Display {
    static get_default(): Display;
    get_n_monitors(): number;
    get_monitor(index: number): Monitor | null;
    get_default_seat(): Seat;
    get_name(): string;
  }

  class Monitor {
    get_geometry(): Rectangle;
    get_scale_factor(): number;
    get_model(): string;
    is_primary(): boolean;
    get_workarea(): Rectangle;
  }

  class Seat {
    get_pointer(): Device;
    get_keyboard(): Device;
    get_capabilities(): SeatCapabilities;
  }

  class Device {
    get_position(): [number, number];
    get_device_type(): DeviceType;
  }

  interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface RGBA {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    parse(spec: string): boolean;
    to_string(): string;
  }

  enum SeatCapabilities {
    NONE,
    POINTER,
    TOUCH,
    TABLET_STYLUS,
    KEYBOARD,
    ALL,
  }

  enum DeviceType {
    MASTER,
    SLAVE,
    FLOATING,
  }
}

// imports.gi.GObject (Base object system)
declare namespace imports.gi.GObject {
  class Object {
    connect(event: string, callback: (...args: any[]) => boolean | void): number;
    disconnect(id: number): void;
    set_property(property: string, value: any): void;
    get_property(property: string): any;
    notify(property: string): void;
  }
}

// imports.gi.Meta (Window management)
declare namespace imports.gi.Meta {
  class KeyBinding {
    constructor(params?: { name?: string; key?: string; action?: () => void });
    name: string;
    key: string;
    set_keybinding(name: string, key: string, action: () => void): void;
    remove_keybinding(name: string): void;
  }

  class GlobalShortcut {
    constructor(params?: { name?: string; key?: string; action?: () => void });
    name: string;
    key: string;
    register(): boolean;
    unregister(): void;
    is_registered(): boolean;
    set_action(action: () => void): void;
  }

  class Window {
    constructor(params?: { title?: string; pid?: number });
    title: string;
    pid: number;
    get_title(): string;
    get_pid(): number;
    get_window_type(): WindowType;
    maximize(flags: MaximizeFlags): void;
    unmaximize(flags: MaximizeFlags): void;
    minimize(): void;
    unminimize(): void;
    activate(time: number): void;
    close(time: number): void;
    is_fullscreen(): boolean;
    set_fullscreen(fullscreen: boolean): void;
    get_monitor(): number;
    set_opacity(opacity: number): void;
    move(x: number, y: number): void;
    resize(width: number, height: number): void;
    get_frame_rect(): Rectangle;
    get_client_area(): Rectangle;
    get_workspace(): Workspace;
    connect(event: string, callback: (...args: any[]) => void): number;
    get_compositor_private(): imports.gi.Clutter.Actor;
    get_wm_class(): string | null;
    move_resize_frame(with_frame: boolean, x: number, y: number, width: number, height: number): void;
    is_on_all_workspaces(): boolean;
    change_workspace_by_index(workspace: number, append: boolean): void;
    get_maximized(): MaximizeFlags;
  }

  class Display {
    get_monitor_geometry(monitor: number): imports.gi.Gdk.Rectangle;
    get_current_monitor(): number;
    get_n_monitors(): number;
    get_workspace_manager(): WorkspaceManager;
    connect(event: string, callback: (...args: any[]) => void): number;
    get_focus_window(): Window | null;
  }

  class Screen {
    get_n_workspaces(): number;
    get_active_workspace(): Workspace;
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  class WorkspaceManager {
    get_n_workspaces(): number;
    get_workspace_by_index(index: number): Workspace;
    get_active_workspace(): Workspace;
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  class Workspace {
    list_windows(): Window[];
    activate(timestamp: number): void;
    index(): number;
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  enum WindowType {
    NORMAL,
    DIALOG,
    MODAL,
    DOCK,
    MENU,
    TOOLBAR,
    SPLASHSCREEN,
    UTILITY,
    DESKTOP,
    NOTIFICATION,
  }

  enum MaximizeFlags {
    HORIZONTAL = 1,
    VERTICAL = 2,
    BOTH = 3,
  }

  enum KeyBindingFlags {
    NONE,
    PER_WINDOW,
    BUILTIN,
    NO_AUTO_GRAB,
  }

  interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

// Panel interface
declare interface Panel {
  addToStatusArea(identifier: string, indicator: imports.ui.panelMenu.Button, position?: number): void;
  removeFromStatusArea(identifier: string): void;
  actor: imports.gi.Clutter.Actor;
  height: number;
  connect(event: string, callback: (...args: any[]) => void): number;
}

// Overview interface
declare interface Overview {
  show(): void;
  hide(): void;
  toggle(): void;
  visible: boolean;
  addSearchProvider(provider: any): void;
  removeSearchProvider(provider: any): void;
  get_active_page(): OverviewPage;
  select_page(page: OverviewPage): void;
}

enum OverviewPage {
  APPS,
  SEARCH,
  WORKSPACES,
}

// AppSystem interface
declare interface AppSystem {
  lookup_app(id: string): imports.gi.Shell.App | null;
  get_running(): imports.gi.Shell.App[];
  get_installed(): imports.gi.Shell.App[];
  connect(event: string, callback: (...args: any[]) => void): number;
}

// App interface
declare interface App {
  get_name(): string;
  get_description(): string | null;
  activate(): void;
  get_id(): string;
  launch(timestamp: number, workspace: number): boolean;
}

// SessionMode interface
declare interface SessionMode {
  isLocked: boolean;
  isGreeter: boolean;
  mode: string;
}

// imports.ui.panelMenu (Top bar indicators)
declare namespace imports.ui.panelMenu {
  class Button extends imports.gi.St.Widget {
    constructor(box: number, name?: string);
    setMenu(menu: PopupMenu): void;
    setSensitive(sensitive: boolean): void;
    destroy(): void;
    menu: PopupMenu | null;
    setIcon(icon: imports.gi.St.Icon): void;
    removeIcon(): void;
    connect(event: string, callback: (...args: any[]) => boolean | void): number;
  }

  class SystemIndicator {
    constructor();
    addQuickSettingsItem(item: imports.gi.St.Widget): void;
    quickSettingsItems: imports.gi.St.Widget[];
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  class PopupMenu {
    constructor(sourceActor: imports.gi.Clutter.Actor, alignment: number, arrowSide: imports.gi.St.Side);
    addMenuItem(item: PopupMenuItem): void;
    addAction(title: string, callback: () => void): PopupMenuItem;
    open(animate?: boolean): void;
    close(animate?: boolean): void;
    toggle(): void;
    removeAll(): void;
    setSensitive(sensitive: boolean): void;
    actor: imports.gi.Clutter.Actor;
    isOpen: boolean;
    sourceActor: imports.gi.Clutter.Actor;
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  class PopupMenuItem extends imports.gi.St.Widget {
    constructor(text: string, params?: { reactive?: boolean; style_class?: string });
    connect(event: string, callback: (...args: any[]) => boolean | void): number;
    activate(): void;
    setSensitive(sensitive: boolean): void;
    setOrnament(ornament: OrnamentType): void;
    label: imports.gi.St.Label;
  }

  class PopupSubMenuMenuItem extends PopupMenuItem {
    constructor(text: string, params?: { reactive?: boolean });
    menu: PopupMenu;
    setSubmenuShown(shown: boolean): void;
  }

  class PopupSeparatorMenuItem extends PopupMenuItem {
    constructor();
  }

  class PopupImageMenuItem extends PopupMenuItem {
    constructor(text: string, icon: string | imports.gi.Gio.Icon, params?: { reactive?: boolean });
    setIcon(icon: string | imports.gi.Gio.Icon): void;
  }

  enum OrnamentType {
    NONE,
    CHECK,
    DOT,
  }
}

// imports.ui.status (System status indicators)
declare namespace imports.ui.status {
  class Volume extends imports.ui.panelMenu.Button {
    constructor();
    getIndicator(): imports.gi.St.Widget;
  }

  class Network extends imports.ui.panelMenu.Button {
    constructor();
    getIndicator(): imports.gi.St.Widget;
  }

  class Power extends imports.ui.panelMenu.Button {
    constructor();
    getIndicator(): imports.gi.St.Widget;
  }

  class Brightness extends imports.ui.panelMenu.Button {
    constructor();
    getIndicator(): imports.gi.St.Widget;
  }

  class Bluetooth extends imports.ui.panelMenu.Button {
    constructor();
    getIndicator(): imports.gi.St.Widget;
  }
}

// imports.misc.extensionUtils (Extension utilities)
declare namespace imports.misc.extensionUtils {
  function getCurrentExtension(): Extension;
  function initTranslations(domain?: string): void;
  function getSettings(schema_id?: string): imports.gi.Gio.Settings;
  function installImporter(module: string): any;
  function openPrefs(): void;
  function getExtensionPath(): string;
  function isExtensionEnabled(uuid: string): boolean;
}

declare interface Extension {
  uuid: string;
  dir: imports.gi.Gio.File;
  metadata: ExtensionMetadata;
  imports: any;
  path: string;
  state: ExtensionState;
}

declare interface ExtensionMetadata {
  name: string;
  description: string;
  uuid: string;
  version: number;
  "gettext-domain"?: string;
  "settings-schema"?: string;
}

enum ExtensionState {
  ENABLED,
  DISABLED,
  ERROR,
  OUT_OF_DATE,
}

// imports.ui (GNOME Shell UI)
declare namespace imports.ui {
  namespace main {
    const panel: Panel;
    const overview: Overview;
    const sessionMode: SessionMode;
    const uiGroup: imports.gi.Clutter.Actor;
    const wm: WindowManager;
    const messageTray: MessageTray;
    const layoutManager: LayoutManager;
    const extensionManager: ExtensionManager;

    function notify(message: string, details?: string): void;
    function notifyError(message: string, details?: string): void;
    function getAppSystem(): AppSystem;
    function startModal(params?: { timestamp?: number; options?: any }): boolean;
    function endModal(timestamp?: number): void;
    function activateWindow(window: imports.gi.Meta.Window, time?: number): void;
    function loadTheme(): void;
    function pushModal(actor: imports.gi.Clutter.Actor, params?: { timestamp?: number; options?: any }): boolean;
    function popModal(actor: imports.gi.Clutter.Actor, timestamp?: number): void;
    function get_panels(): Panel[];
    function runDialog(): void;
    function get_pointer_actor(): imports.gi.Clutter.Actor;
    function createLookingGlass(): LookingGlass;
  }

  class WindowManager {
    connect(event: string, callback: (...args: any[]) => void): number;
    allowKeybinding(name: string, mode: string): void;
    add_keybinding(name: string, settings: imports.gi.Gio.Settings, flags: imports.gi.Meta.KeyBindingFlags, handler: () => void): number;
    remove_keybinding(name: string): void;
  }

  class MessageTray {
    add(source: Source): void;
    remove(source: Source): void;
    getSources(): Source[];
    showNotification(notification: Notification): void;
  }

  class Source {
    constructor(title: string, icon: imports.gi.Gio.Icon | string);
    showNotification(notification: Notification): void;
    destroy(): void;
    connect(event: string, callback: (...args: any[]) => void): number;
    icon: imports.gi.St.Icon;
  }

  class Notification {
    constructor(source: Source, title: string, message: string, params?: { banner?: boolean; gicon?: imports.gi.Gio.Icon });
    addAction(label: string, callback: () => void): void;
    destroy(): void;
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  class LayoutManager {
    monitors: Monitor[];
    primaryMonitor: Monitor | null;
    get_monitor_geometry(monitor: number): imports.gi.Gdk.Rectangle;
    get_work_area_for_monitor(monitor: number): imports.gi.Gdk.Rectangle;
    connect(event: string, callback: (...args: any[]) => void): number;
  }

  class Monitor {
    index: number;
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    geometry: imports.gi.Gdk.Rectangle;
  }

  class ExtensionManager {
    lookup(uuid: string): Extension;
    enableExtension(uuid: string): boolean;
    disableExtension(uuid: string): boolean;
    getEnabledExtensions(): string[];
  }

  class LookingGlass {
    open(): void;
    close(): void;
    toggle(): void;
    isOpen: boolean;
  }
}