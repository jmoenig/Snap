function password_hash(hashme)
{
	return hex_sha512(hex_sha512(hashme + "glhf") + "with rainbowtables");
}

BlockEditorMorph.prototype.snapAppsModify = function () {
	this.addButton("protect", "Protect");
}

BlockEditorMorph.prototype.protect = function ()
{
	new DialogBoxMorph(this, 'protectDialog', this).prompt(
		'Password protect block', '',
		this.world(),
		new TextMorph(
		'Enter a password to protect this block\'s contents from being viewed/edited. Leave blank to remove any existing password.'));
}

BlockEditorMorph.prototype.protectDialog = function (string)
{
	this.definition.password = password_hash(string);
}

CustomCommandBlockMorph.prototype.snapAppsCanEdit = function (callback)
{
	if (this.definition.password)
	{
		this.onPasswordCallback = callback;
		new DialogBoxMorph(this, 'recievePassword', this).prompt(
			'Password protected block', '',
			this.world(),
			new TextMorph(
			'Enter the password to view how this block works.'));
	}
	else
	{
        callback.call(this);
	}
}

CustomCommandBlockMorph.prototype.recievePassword = function (password)
{
	if (password_hash(password) == this.definition.password)
	{
		this.onPasswordCallback();
		delete this.onPasswordCallback;
	}
	else
	{
		new DialogBoxMorph(this, 'recievePassword', this).prompt(
			'Password incorrect', '',
			this.world(),
			new TextMorph(
			 'The buttons that you depressed whilst the previous textbox was activated\n'
			+'were not the correct buttons, only some of them were the correct buttons,\n'
			+'or you did not depress them in the right order. Please re-attempt the\n'
			+'password entry.'));
	}
}

CustomReporterBlockMorph.prototype.snapAppsCanEdit =
    CustomCommandBlockMorph.prototype.snapAppsCanEdit;

CustomReporterBlockMorph.prototype.recievePassword =
    CustomCommandBlockMorph.prototype.recievePassword;
