/******************************************\
 *  ____  _            ____  _         _  *
 * | __ )| |_   _  ___| __ )(_)_ __ __| | *
 * |  _ \| | | | |/ _ \  _ \| | '__/ _` | *
 * | |_) | | |_| |  __/ |_) | | | | (_| | *
 * |____/|_|\__,_|\___|____/|_|_|  \__,_| *
 *                                        *
 * This file is licensed under the GNU    *
 * General Public License 3. To use or    *
 * modify it you must accept the terms    *
 * of the license.                        *
 * ___________________________            *
 * \ @author BlueBirdMC Team /            *
\******************************************/

const NBTBaseBinaryStream = require("./NBTBaseBinaryStream");

class NBTBEBinaryStream extends NBTBaseBinaryStream {
	readShort() {
		return this.readShortBE();
	}

	writeShort(value) {
		this.writeShortBE(value);
	}

	readInt() {
		return this.readIntBE();
	}

	writeInt(value) {
		this.writeIntBE(value);
	}

	readLong() {
		return this.readLongBE();
	}

	writeLong(value) {
		this.writeLongBE(value);
	}

	readFloat() {
		return this.readFloatBE();
	}

	writeFloat(value) {
		this.writeFloatBE(value);
	}

	readDouble() {
		return this.readDoubleBE();
	}

	writeDouble(value) {
		this.writeDoubleBE(value);
	}

	readStrlen() {
		return this.readUnsignedShortBE();
	}

	writeStrlen(value) {
		this.writeUnsignedShortBE(value);
	}
}

module.exports = NBTBEBinaryStream;