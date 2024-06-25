class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array = []) {
        let sortedArr = array.sort(function (a, b) { return a - b })
        sortedArr = sortedArr.filter((item, index) => sortedArr.indexOf(item) === index);
        this.tree = this.buildTree(sortedArr);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);

        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);

        return node;
    }

    insert(value, node = this.tree) {
        if (node.value > value) {
            if (node.left == null) {
                node.left = new Node(value);
            } else {
                this.insert(value, node.left);
            }
        } else {
            if (node.right == null) {
                node.right = new Node(value);
            } else {
                this.insert(value, node.right);
            }
        }
    }

    deleteItem(value, node = this.tree) {
        if (node.left != null) {
            if (value == node.left.value) {
                node.left = null;
                return;
            }
        } else if (node.right != null) {
            if (value == node.right.value) {
                node.right = null;
                return;
            }
        }
        if (node.value > value) {
            this.deleteItem(value, node.left);
        } else {
            this.deleteItem(value, node.right);
        }
    }

    find(value, node = this.tree) {
        if (node.value > value) {
            if (node.left != null) {
                if (node.left.value == value) {
                    return true;
                } else {
                    return this.find(value, node.left);
                }
            } else {
                return false;
            }
        } else {
            if (node.right != null) {
                if (node.right.value == value) {
                    return true;
                } else {
                    return this.find(value, node.right);
                }
            } else {
                return false;
            }
        }
    }

    levelOrder(callback) {
        const result = [];
        const queue = [];
        if (this.tree !== null) queue.push(this.tree);

        while (queue.length > 0) {
            const node = queue.shift();
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }

        if (!callback) return result;
    }

    // new
    inOrder(callback, node = this.tree, result = []) {
        if (node !== null) {
            this.inOrder(callback, node.left, result);
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }
            this.inOrder(callback, node.right, result);
        }

        if (!callback) return result;
    }

    preOrder(callback, node = this.tree, result = []) {
        if (node !== null) {
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }
            this.preOrder(callback, node.left, result);
            this.preOrder(callback, node.right, result);
        }

        if (!callback) return result;
    }

    postOrder(callback, node = this.tree, result = []) {
        if (node !== null) {
            this.postOrder(callback, node.left, result);
            this.postOrder(callback, node.right, result);
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }
        }

        if (!callback) return result;
    }

    height(node) {
        if (node === null) return -1;
        return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    depth(node, root = this.tree) {
        if (root === null) return -1;
        if (node.value === root.value) return 0;

        const dist =
            node.value < root.value
                ? this.depth(node, root.left)
                : this.depth(node, root.right);
        return dist >= 0 ? dist + 1 : -1;
    }

    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right)
        ) {
            return true;
        }

        return false;
    }

    rebalance() {
        const nodes = this.inOrder();
        this.root = this.buildTree(nodes);
    }
}