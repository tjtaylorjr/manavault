from flask.cli import AppGroup
from .users import seed_demo, undo_users
from .format_legalities import seed_formats, undo_formats

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_demo()
    seed_formats()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_formats()
    # Add other undo functions here
