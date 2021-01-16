from flask.cli import AppGroup
from .users import seed_demo, seed_users, undo_users
from .sets import seed_sets, undo_sets
from .cards import seed_cards, undo_cards
from .alternate_cardfaces import seed_alt_cardfaces, undo_alt_cardfaces
from .format_lists import seed_format_lists, undo_format_lists
from .illustrations import seed_illustrations, undo_illustrations

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_demo()
    seed_users()
    seed_sets()
    seed_cards()
    seed_alt_cardfaces()
    seed_format_lists()
    seed_illustrations()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_sets()
    undo_cards()
    undo_alt_cardfaces()
    undo_format_lists()
    undo_illustrations()
    # Add other undo functions here
